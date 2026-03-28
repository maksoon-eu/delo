'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { ClientSchema, type ClientInput } from '@/schemas/clients';
import type { ClientDetails, ClientListItem } from '@/types';

export async function getClients(): Promise<ClientListItem[]> {
  const session = await auth();
  if (!session) return [];

  const clients = await db.client.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return clients.map((client) => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    company: client.company,
    createdAt: client.createdAt,
  }));
}

export async function getClient(id: string): Promise<ClientDetails | null> {
  const session = await auth();
  if (!session) return null;

  const client = await db.client.findUnique({
    where: { id, userId: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: {
        select: { orders: true },
      },
    },
  });

  if (!client) return null;

  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    company: client.company,
    inn: client.inn,
    notes: client.notes,
    ordersTotal: client._count.orders,
    orders: client.orders.map((order) => ({
      id: order.id,
      title: order.title,
      status: order.status,
      price: order.price ? Number(order.price) : null,
      currency: order.currency,
      createdAt: order.createdAt,
    })),
  };
}

export async function createClient(data: ClientInput): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const { data: parsed, success, error } = ClientSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  await db.client.create({
    data: {
      userId: session.user.id,
      name: parsed.name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      company: parsed.company || null,
      inn: parsed.inn || null,
      notes: parsed.notes || null,
    },
  });

  revalidatePath('/clients');
  return {};
}

export async function updateClient(id: string, data: ClientInput): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const { data: parsed, success, error } = ClientSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const existing = await db.client.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Клиент не найден' };

  await db.client.update({
    where: { id },
    data: {
      name: parsed.name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      company: parsed.company || null,
      inn: parsed.inn || null,
      notes: parsed.notes || null,
    },
  });

  revalidatePath('/clients');
  return {};
}

export async function deleteClient(id: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const existing = await db.client.findUnique({ where: { id, userId: session.user.id } });
  if (!existing) return { error: 'Клиент не найден' };

  await db.client.delete({ where: { id } });

  revalidatePath('/clients');
  return {};
}
