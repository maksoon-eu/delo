import type { ActivityType } from '@prisma/client';

export type ActivityEntry = {
  id: string;
  type: ActivityType;
  createdAt: Date;
};

export type PaymentEntry = {
  id: string;
  amount: number;
  note: string | null;
  paidAt: Date;
  createdAt: Date;
};
