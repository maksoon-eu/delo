import type { Route } from 'next';
import type { AnimatedIconComponent } from '@/types/icons';

export enum NavItemKey {
  MAIN = 'main',
  CLIENTS = 'clients',
  ORDERS = 'orders',
  REPORTS = 'reports',
  PROFILE = 'profile',
  NOT_FOUND = 'notFound',
}

export type NavItem = {
  href: Route;
  label: string;
  pageTitle?: string;
  description: string;
  Icon: AnimatedIconComponent;
  isDisabled?: boolean;
};
