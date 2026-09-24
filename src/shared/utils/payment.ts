import type { PaymentStatus } from '@prisma/client';

export function calcPaymentStatus(totalPaid: number, orderPrice: number): PaymentStatus {
  if (totalPaid <= 0) return 'PENDING';
  if (orderPrice > 0 && totalPaid >= orderPrice) return 'PAID';
  return 'PARTIAL';
}
