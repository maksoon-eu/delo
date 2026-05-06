import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';
import { requiredAmount } from '@/lib/utils';

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Название позиции обязательно'),
  description: z.string(),
  price: requiredAmount(
    'Цена обязательна',
    'Цена должна быть больше 0',
    'Цена должна быть в рублях без копеек'
  ),
});

export const OrderSchema = z
  .object({
    clientId: z.string().min(1, 'Клиент обязателен'),
    title: z.string().min(1, 'Заголовок обязателен'),
    description: z.string(),
    startDate: z.string(),
    deadline: z.string(),
    price: requiredAmount(
      'Стоимость обязательна',
      'Стоимость должна быть больше 0',
      'Стоимость должна быть в рублях без копеек'
    ),
    paymentMethod: z.enum(PaymentMethod).nullable().optional(),
    items: z.array(OrderItemSchema),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.deadline && data.startDate >= data.deadline) {
      ctx.addIssue({
        code: 'custom',
        message: 'Дедлайн должен быть позже даты начала',
        path: ['deadline'],
      });
    }

    const itemsTotal = data.items.reduce((sum, item) => sum + item.price, 0);

    if (data.price !== itemsTotal) {
      ctx.addIssue({
        code: 'custom',
        message: 'Стоимость должна совпадать с суммой состава работ',
        path: ['price'],
      });
    }
  });

export type OrderItemInput = z.input<typeof OrderItemSchema>;
export type OrderInput = z.input<typeof OrderSchema>;
