import { z } from 'zod';
import { requiredAmount } from '@/lib/utils';

export const PaymentSchema = z.object({
  amount: requiredAmount(
    'Сумма обязательна',
    'Сумма должна быть больше 0',
    'Сумма должна быть в рублях без копеек'
  ),
  paidAt: z.string().min(1, 'Дата обязательна'),
  note: z.string(),
});

export type PaymentInput = z.input<typeof PaymentSchema>;
