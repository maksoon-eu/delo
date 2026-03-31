import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Название позиции обязательно'),
  description: z.string(),
  quantity: z.number().min(0.01, 'Количество должно быть больше 0'),
  unit: z.string(),
  price: z.number().min(0.01, 'Цена должна быть больше 0'),
});

export const OrderSchema = z.object({
  clientId: z.string().min(1, 'Клиент обязателен'),
  title: z.string().min(1, 'Заголовок обязателен'),
  description: z.string(),
  startDate: z.string(),
  deadline: z.string(),
  price: z.number().min(0).nullable().optional(),
  paymentMethod: z.enum(PaymentMethod).nullable().optional(),
  items: z.array(OrderItemSchema),
});

export type OrderItemInput = z.input<typeof OrderItemSchema>;
export type OrderInput = z.input<typeof OrderSchema>;
