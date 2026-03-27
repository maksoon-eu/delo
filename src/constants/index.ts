import { NavItem } from '@/types';
import { FileTextIcon } from '@/components/icons/file-text';
import { HomeIcon } from '@/components/icons/home';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UsersIcon } from '@/components/icons/users';

export const SIDEBAR_COOKIE_KEY = 'sidebar-collapsed';
export const COOKIE_STORAGE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOGIN_ATTEMPTS_PER_TIER = 4;
export const LOGIN_BASE_LOCKOUT_SECONDS = 30;
export const PASSWORD_RESET_COOLDOWN_MS = 30 * 1000;

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Главная', Icon: HomeIcon },
  { href: '/clients', label: 'Клиенты', Icon: UsersIcon },
  { href: '/orders', label: 'Заказы', Icon: FileTextIcon },
  { href: '/reports', label: 'Отчёты', Icon: TrendingUpIcon },
];
