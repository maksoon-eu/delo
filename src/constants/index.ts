import { AnimatedIconComponent, NavItem } from '@/types';
import { CircleCheckIcon } from '@/components/icons/circle-check';
import { CheckCheckIcon } from '@/components/icons/check-check';
import { FileTextIcon } from '@/components/icons/file-text';
import { HomeIcon } from '@/components/icons/home';
import { SendIcon } from '@/components/icons/send';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UsersIcon } from '@/components/icons/users';
import { XIcon } from '@/components/icons/x';
import { ZapIcon } from '@/components/icons/zap';
import { ActivityType, OrderStatus, PaymentMethod } from '@prisma/client';
import {
  CheckCheck,
  CircleDollarSign,
  CircleCheck,
  FileText,
  MessageCircle,
  Send,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

export const ORDER_STATUS_ACTION_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'Отправить',
  CONFIRMED: 'Подтвердить',
  IN_PROGRESS: 'Взять в работу',
  COMPLETED: 'Завершить',
  CANCELLED: 'Отменить',
};

export const ORDER_STATUS_ICONS: Record<OrderStatus, AnimatedIconComponent> = {
  DRAFT: FileTextIcon,
  SENT: SendIcon,
  CONFIRMED: CircleCheckIcon,
  IN_PROGRESS: ZapIcon,
  COMPLETED: CheckCheckIcon,
  CANCELLED: XIcon,
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

export const PAYMENT_METHOD_OPTIONS_MAP: Record<string, (typeof PAYMENT_METHOD_OPTIONS)[number]> =
  Object.fromEntries(PAYMENT_METHOD_OPTIONS.map((o) => [o.value, o]));

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Ожидает оплаты',
  PARTIAL: 'Предоплата получена',
  PAID: 'Оплачен',
};

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['CANCELLED'],
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

export const ORDER_STATUS_STATIC_ICONS: Record<OrderStatus, LucideIcon> = {
  DRAFT: FileText,
  SENT: Send,
  CONFIRMED: CircleCheck,
  IN_PROGRESS: Zap,
  COMPLETED: CheckCheck,
  CANCELLED: X,
};

export const ACTIVITY_TYPE_ICONS: Record<ActivityType, LucideIcon> = {
  DRAFT: FileText,
  SENT: Send,
  CONFIRMED: CircleCheck,
  IN_PROGRESS: Zap,
  COMPLETED: CheckCheck,
  CANCELLED: X,
  NOTE: MessageCircle,
  PAYMENT: CircleDollarSign,
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
