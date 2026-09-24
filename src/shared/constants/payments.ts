import { PaymentMethod } from '@prisma/client';

export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'Не указан' },
  { value: PaymentMethod.CARD, label: 'Банковская карта' },
  { value: PaymentMethod.SBP, label: 'СБП' },
  { value: PaymentMethod.BANK_ACCOUNT, label: 'Расчётный счёт' },
  { value: PaymentMethod.CASH, label: 'Наличные' },
];

export const PAYMENT_METHOD_OPTIONS_MAP: Record<string, (typeof PAYMENT_METHOD_OPTIONS)[number]> =
  Object.fromEntries(PAYMENT_METHOD_OPTIONS.map((o) => [o.value, o]));

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидает оплаты',
  PARTIAL: 'Предоплата получена',
  PAID: 'Оплачен',
};
