'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getDocumentFileName } from '@/lib/document-file';
import { getVerifiedSession } from '@/lib/verified-email';
import { OrderSchema, type OrderInput } from '@/schemas/orders';
import {
  ORDER_LINK_COPIED_ACTIVITY_MESSAGE,
  ORDER_STATUS_ACTIVITY_MESSAGES,
  ORDER_STATUS_TRANSITIONS,
} from '@/constants/orders';
import type { OrderDetails, OrderListItem } from '@/types/orders';
import type { OrderStatus } from '@prisma/client';
import { notFound } from 'next/navigation';

export async function getOrders(params: {
  offset: number;
  take: number;
  status?: OrderStatus;
  clientId?: string;
}): Promise<{ items: OrderListItem[]; hasMore: boolean }> {
  const session = await auth();
  if (!session) return { items: [], hasMore: false };

  const { offset, take, status, clientId } = params;

  const filter = {
    ...(status ? { status } : {}),
    ...(clientId ? { clientId } : {}),
  };

  const rows = await db.order.findMany({
    where: {
      userId: session.user.id,
      ...filter,
    },
    select: {
      id: true,
      title: true,
      status: true,
      clientId: true,
      client: { select: { name: true } },
      price: true,
      deadline: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take,
  });

  const items: OrderListItem[] = rows.map((row) => ({
    id: row.id,
    title: row.title,
    status: row.status,
    clientId: row.clientId,
    clientName: row.client.name,
    price: +row.price,
    deadline: row.deadline,
    createdAt: row.createdAt,
  }));

  return { items, hasMore: items.length === take };
}

export async function getOrder(id: string): Promise<OrderDetails | null> {
  const session = await auth();
  if (!session) return null;

  const order = await db.order.findUnique({
    where: { id, userId: session.user.id },
    include: {
      client: true,
      items: true,
      payments: { orderBy: { paidAt: 'desc' } },
      documents: {
        where: { type: 'INVOICE', url: { not: null } },
        orderBy: { createdAt: 'desc' },
      },
      activities: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    title: order.title,
    description: order.description,
    status: order.status,
    paymentStatus: order.paymentStatus,
    price: +order.price,
    paymentMethod: order.paymentMethod ?? null,
    startDate: order.startDate,
    deadline: order.deadline,
    publicToken: order.publicToken,
    sentAt: order.sentAt,
    confirmedAt: order.confirmedAt,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    clientId: order.clientId,
    clientName: order.client.name,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? '',
      price: +item.price,
    })),
    payments: order.payments.map((p) => ({
      id: p.id,
      amount: +p.amount,
      note: p.note,
      paidAt: p.paidAt,
      createdAt: p.createdAt,
    })),
    documents: order.documents.map((document) => ({
      id: document.id,
      type: document.type,
      name: getDocumentFileName(document.url!),
      createdAt: document.createdAt,
    })),
    activities: order.activities.map((a) => ({
      id: a.id,
      type: a.type,
      text: a.text,
      createdAt: a.createdAt,
    })),
  };
}

export async function searchClients(params: {
  query?: string;
  offset?: number;
  take?: number;
}): Promise<{ id: string; name: string }[]> {
  const { query = '', offset = 0, take = 20 } = params;
  const session = await auth();
  if (!session) return [];

  return db.client.findMany({
    where: {
      userId: session.user.id,
      ...(query && { name: { contains: query, mode: 'insensitive' } }),
    },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
    skip: offset,
    take,
  });
}

export async function createOrder(data: OrderInput): Promise<{ error: string } | { id: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = OrderSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      clientId: parsed.clientId,
      title: parsed.title,
      description: parsed.description || null,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      deadline: parsed.deadline ? new Date(parsed.deadline) : null,
      price: parsed.price,
      paymentMethod: parsed.paymentMethod ?? null,
      items: {
        create: parsed.items.map((item) => ({
          name: item.name,
          description: item.description || null,
          price: item.price,
        })),
      },
      activities: {
        create: { type: 'DRAFT', text: 'Заказ создан' },
      },
    },
  });

  revalidatePath('/orders');
  return { id: order.id };
}

export async function updateOrder(id: string, data: OrderInput): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = OrderSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const existing = await db.order.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Заказ не найден' };

  await db.$transaction([
    db.orderItem.deleteMany({ where: { orderId: id } }),
    db.order.update({
      where: { id },
      data: {
        clientId: parsed.clientId,
        title: parsed.title,
        description: parsed.description || null,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        deadline: parsed.deadline ? new Date(parsed.deadline) : null,
        price: parsed.price,
        paymentMethod: parsed.paymentMethod ?? null,
        items: {
          create: parsed.items.map((item) => ({
            name: item.name,
            description: item.description || null,
            price: item.price,
          })),
        },
      },
    }),
  ]);

  revalidatePath('/orders');
  revalidatePath(`/orders/${id}`);
  return {};
}

export async function updateOrderStatus(
  id: string,
  newStatus: OrderStatus
): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const existing = await db.order.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Заказ не найден' };

  const allowed = ORDER_STATUS_TRANSITIONS[existing.status] ?? [];
  if (!allowed.includes(newStatus)) return { error: 'Недопустимый переход статуса' };

  await db.$transaction([
    db.order.update({
      where: { id },
      data: {
        status: newStatus,
        ...(newStatus === 'CONFIRMED' ? { confirmedAt: new Date() } : {}),
      },
    }),
    db.activity.create({
      data: {
        orderId: id,
        type: newStatus,
        text: ORDER_STATUS_ACTIVITY_MESSAGES[newStatus] ?? `Статус изменён на ${newStatus}`,
      },
    }),
  ]);

  revalidatePath('/orders');
  revalidatePath(`/orders/${id}`);
  return {};
}

export async function deleteOrder(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const existing = await db.order.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Заказ не найден' };

  await db.order.delete({ where: { id } });

  revalidatePath('/orders');
  return {};
}

export async function markOrderSentByLinkCopy(id: string): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const order = await db.order.findUnique({
    where: { id, userId: session.user.id },
    select: { id: true, status: true, sentAt: true },
  });

  if (!order) return { error: 'Заказ не найден' };

  if (order.status === 'DRAFT') {
    await db.$transaction([
      db.order.update({
        where: { id: order.id },
        data: { status: 'SENT', sentAt: order.sentAt ?? new Date() },
      }),
      db.activity.create({
        data: {
          orderId: order.id,
          type: 'SENT',
          text: ORDER_LINK_COPIED_ACTIVITY_MESSAGE,
        },
      }),
    ]);

    revalidatePath('/orders');
    revalidatePath(`/orders/${id}`);
  }

  return {};
}

export async function confirmOrderByClient(token: string): Promise<{ error?: string }> {
  const order = await db.order.findUnique({ where: { publicToken: token } });
  if (!order) notFound();

  if (order.status !== 'SENT')
    return { error: 'Заказ уже подтверждён или не готов к подтверждению' };

  await db.$transaction([
    db.order.update({
      where: { id: order.id },
      data: { status: 'CONFIRMED', confirmedAt: new Date() },
    }),
    db.activity.create({
      data: {
        orderId: order.id,
        type: 'CONFIRMED',
        text: 'Клиент подтвердил условия',
      },
    }),
  ]);

  revalidatePath(`/order/${token}`);
  return {};
}
