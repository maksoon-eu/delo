'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { PaymentSchema, type PaymentInput } from '@/schemas/payments';
import type { PaymentStatus } from '@prisma/client';

function calcPaymentStatus(totalPaid: number, orderPrice: number | null): PaymentStatus {
  if (totalPaid <= 0) return 'PENDING';
  if (orderPrice != null && orderPrice > 0 && totalPaid >= orderPrice) return 'PAID';
  return 'PARTIAL';
}

export async function addPayment(orderId: string, data: PaymentInput): Promise<{ error?: string }> {
  const session = await auth();
  if (!session) return { error: 'Не авторизован' };

  const { data: parsed, success, error } = PaymentSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { payments: true },
  });
  if (!order) return { error: 'Заказ не найден' };

  const existingPaid = order.payments.reduce((sum, p) => sum + +p.amount, 0);
  const newTotal = existingPaid + parsed.amount;
  const orderPrice = order.price ? +order.price : null;
  const newPaymentStatus = calcPaymentStatus(newTotal, orderPrice);

  const activityText = `Получена оплата ${formatPrice(parsed.amount)}${parsed.note ? ` — ${parsed.note}` : ''}`;

  await db.$transaction([
    db.payment.create({
      data: {
        orderId,
        amount: parsed.amount,
        paidAt: new Date(parsed.paidAt),
        note: parsed.note || null,
      },
    }),
    db.order.update({
      where: { id: orderId },
      data: { paymentStatus: newPaymentStatus },
    }),
    db.activity.create({
      data: {
        orderId,
        type: 'PAYMENT',
        text: activityText,
      },
    }),
  ]);

  revalidatePath(`/orders/${orderId}`);
  return {};
}
