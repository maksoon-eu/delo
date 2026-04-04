'use client';

import { useWatch, type Control } from 'react-hook-form';
import type { OrderInput } from '@/schemas/orders';

type OrderTotalProps = { control: Control<OrderInput> };

export function OrderTotal(props: OrderTotalProps) {
  const { control } = props;
  const items = useWatch({ control, name: 'items' });

  const total = items.reduce((sum, item) => sum + (item.price as number), 0);

  if (total === 0) return null;

  return (
    <span className="text-muted-foreground text-sm">Итого: {total.toLocaleString('ru-RU')} ₽</span>
  );
}
