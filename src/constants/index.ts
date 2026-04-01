import { NavItem } from '@/types';
import { FileTextIcon } from '@/components/icons/file-text';
import { HomeIcon } from '@/components/icons/home';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UsersIcon } from '@/components/icons/users';
import { OrderStatus, PaymentMethod } from '@prisma/client';

export const SIDEBAR_COOKIE_KEY = 'sidebar-collapsed';
export const COOKIE_STORAGE_MAX_AGE = 60 * 60 * 24 * 365;

export const CLIENTS_PAGE_SIZE = 20;

export const LOGIN_ATTEMPTS_PER_TIER = 4;
export const LOGIN_BASE_LOCKOUT_SECONDS = 30;
export const PASSWORD_RESET_COOLDOWN_MS = 30 * 1000;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'Отправлен',
  CONFIRMED: 'Подтверждён',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Завершён',
  CANCELLED: 'Отменён',
};

export const ORDER_STATUS_VARIANTS: Record<
  OrderStatus,
  'outline' | 'secondary' | 'default' | 'destructive'
> = {
  DRAFT: 'outline',
  SENT: 'secondary',
  CONFIRMED: 'secondary',
  IN_PROGRESS: 'default',
  COMPLETED: 'outline',
  CANCELLED: 'destructive',
};

export const ORDERS_PAGE_SIZE = 20;

export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'Не указан' },
  { value: PaymentMethod.CARD, label: 'Банковская карта' },
  { value: PaymentMethod.SBP, label: 'СБП' },
  { value: PaymentMethod.BANK_ACCOUNT, label: 'Расчётный счёт' },
  { value: PaymentMethod.CASH, label: 'Наличные' },
];

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const ORDER_STATUS_ACTIVITY_MESSAGES: Record<string, string> = {
  SENT: 'Заказ отправлен клиенту',
  CONFIRMED: 'Клиент подтвердил условия',
  IN_PROGRESS: 'Заказ взят в работу',
  COMPLETED: 'Заказ завершён',
  CANCELLED: 'Заказ отменён',
};

export const NAV_ITEMS: Record<string, NavItem> = {
  main: {
    href: '/',
    label: 'Главная',
    description: 'Обзор ключевых показателей и последних активностей',
    Icon: HomeIcon,
  },
  clients: {
    href: '/clients',
    label: 'Клиенты',
    description: 'Управляйте базой клиентов и историей работы с ними',
    Icon: UsersIcon,
  },
  orders: {
    href: '/orders',
    label: 'Заказы',
    description: 'Отслеживайте заказы, статусы и оплаты',
    Icon: FileTextIcon,
  },
  reports: {
    href: '/reports',
    label: 'Отчёты',
    description: 'Анализируйте доходы и статистику по периодам',
    Icon: TrendingUpIcon,
  },
};
