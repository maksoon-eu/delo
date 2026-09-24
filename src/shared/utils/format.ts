import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatDate(date: Date, fmt = 'd MMM yyyy'): string {
  return format(date, fmt, { locale: ru });
}

export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  });
}
