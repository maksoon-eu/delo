'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getVerifiedSession } from '@/lib/verified-email';
import { calcPaymentStatus, formatPrice } from '@/lib/utils';
import { PaymentSchema, type PaymentInput } from '@/schemas/payments';

export async function addPayment(orderId: string, data: PaymentInput): Promise<{ error?: string }> {
  const verifiedSession = await getVerifiedSession();
  if (!verifiedSession.ok) return { error: verifiedSession.error };
  const { session } = verifiedSession;

  const { data: parsed, success, error } = PaymentSchema.safeParse(data);
  if (!success) return { error: error.issues[0].message };

  const order = await db.order.findUnique({
    where: { id: orderId, userId: session.user.id },
    include: { payments: true },
  });
  if (!order) return { error: 'Заказ не найден' };

  const existingPaid = order.payments.reduce((sum, p) => sum + +p.amount, 0);
  const newTotal = existingPaid + parsed.amount;
  const orderPrice = +order.price;
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
