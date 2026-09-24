import type { OrderStatus } from '@prisma/client';

export type ClientListItem = {
  id: string;
  name: string;
  contact: string | null;
  company: string | null;
  createdAt: Date;
  totalPaid: number;
};

export type ClientOrderSummary = {
  id: string;
  title: string;
  status: OrderStatus;
  price: number;
  createdAt: Date;
};

export type ClientDetails = {
  id: string;
  name: string;
  contact: string | null;
  company: string | null;
  inn: string | null;
  notes: string | null;
  ordersTotal: number;
  orders: ClientOrderSummary[];
};
