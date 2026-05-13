import type { ActivityType } from '@prisma/client';

export type ActivityEntry = {
  id: string;
  type: ActivityType;
  text: string;
  createdAt: Date;
};

export type PaymentEntry = {
  id: string;
  amount: number;
  note: string | null;
  paidAt: Date;
  createdAt: Date;
};
