import { NavItem } from '@/types';
import { FileTextIcon } from '@/components/icons/file-text';
import { HomeIcon } from '@/components/icons/home';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UsersIcon } from '@/components/icons/users';

export const SIDEBAR_STORAGE_KEY = 'sidebar-collapsed';

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Главная', Icon: HomeIcon },
  { href: '/clients', label: 'Клиенты', Icon: UsersIcon },
  { href: '/orders', label: 'Заказы', Icon: FileTextIcon },
  { href: '/reports', label: 'Отчёты', Icon: TrendingUpIcon },
];
