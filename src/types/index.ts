import type { Route } from 'next';
import type { ComponentType, Ref } from 'react';

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
  status: string;
  price: number | null;
  currency: string;
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
