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

export const ORDER_STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Черновик',
  SENT: 'Отправлен',
  CONFIRMED: 'Подтверждён',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Завершён',
  CANCELLED: 'Отменён',
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Главная',
    description: 'Обзор ключевых показателей и последних активностей',
    Icon: HomeIcon,
  },
  {
    href: '/clients',
    label: 'Клиенты',
    description: 'Управляйте базой клиентов и историей работы с ними',
    Icon: UsersIcon,
  },
  {
    href: '/orders',
    label: 'Заказы',
    description: 'Отслеживайте заказы, статусы и оплаты',
    Icon: FileTextIcon,
  },
  {
    href: '/reports',
    label: 'Отчёты',
    description: 'Анализируйте доходы и статистику по периодам',
    Icon: TrendingUpIcon,
  },
];
