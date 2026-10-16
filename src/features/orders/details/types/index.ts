import type { ReactNode } from 'react';
import type { OrderStatus } from '@prisma/client';
import type { AnimatedIconComponent } from '@/shared/types/icons';

export type OrderTransitionAction = {
  targetStatus: OrderStatus;
  label: string;
  statusLabel: string;
  destructive: boolean;
  Icon: AnimatedIconComponent;
};

export type OrderDetailsSlots = {
  information: ReactNode;
  workItems: ReactNode;
  payments: ReactNode;
  activity: ReactNode;
};
