import type { Route } from 'next';
import type { ComponentType, Ref } from 'react';
import type { OrderStatus, PaymentMethod } from '@prisma/client';

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export type AnimatedIconComponent = ComponentType<{
  size?: number;
  ref?: Ref<AnimatedIconHandle>;
}>;

export type NavItem = {
  href: Route;
  label: string;
  description: string;
  Icon: AnimatedIconComponent;
};

export type ClientListItem = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  createdAt: Date;
  totalPaid: number;
};

export type ClientOrderSummary = {
  id: string;
  title: string;
  status: OrderStatus;
  price: number | null;
  createdAt: Date;
};

export type ClientDetails = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  inn: string | null;
  notes: string | null;
  ordersTotal: number;
  orders: ClientOrderSummary[];
};

export type OrderListItem = {
  id: string;
  title: string;
  status: string;
  clientId: string;
  clientName: string;
  price: number | null;
  deadline: Date | null;
  createdAt: Date;
};

export type ActivityEntry = {
  id: string;
  text: string;
  createdAt: Date;
};

export type OrderItemData = {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
};

export type OrderDetails = {
  id: string;
  title: string;
  description: string | null;
  status: OrderStatus;
  paymentStatus: string;
  price: number | null;
  paymentMethod: PaymentMethod | null;
  startDate: Date | null;
  deadline: Date | null;
  publicToken: string;
  confirmedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  clientId: string;
  clientName: string;
  clientEmail: string | null;
  items: OrderItemData[];
  activities: ActivityEntry[];
};

export type SelectOption = {
  value: string;
  label: string;
};
