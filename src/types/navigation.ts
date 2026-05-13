import type { Route } from 'next';
import type { AnimatedIconComponent } from '@/types/icons';

export type NavItem = {
  href: Route;
  label: string;
  description: string;
  Icon: AnimatedIconComponent;
};
