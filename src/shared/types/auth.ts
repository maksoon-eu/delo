import type { Route } from 'next';
import type { LucideIcon } from 'lucide-react';

export type AuthTabId = 'login' | 'register';

export type AuthPanelSegment =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'verify-email';

export type AuthTab = {
  id: AuthTabId;
  label: string;
  href: Route;
};

export type AuthFeature = {
  label: string;
  Icon: LucideIcon;
};

export type AuthPanelContent = {
  activeTab: AuthTabId | null;
  title: string;
  description: string;
};
