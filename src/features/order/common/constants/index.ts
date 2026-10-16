import type { OrderStatus } from '@prisma/client';

export const PROGRESS_STATUSES: OrderStatus[] = [
  'DRAFT',
  'SENT',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
];
