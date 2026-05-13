import type { AnimatedIconComponent } from '@/types/icons';
import { CircleCheckIcon } from '@/components/icons/circle-check';
import { CheckCheckIcon } from '@/components/icons/check-check';
import { FileTextIcon } from '@/components/icons/file-text';
import { SendIcon } from '@/components/icons/send';
import { XIcon } from '@/components/icons/x';
import { ZapIcon } from '@/components/icons/zap';
import { OrderStatus } from '@prisma/client';
import { CheckCheck, CircleCheck, FileText, Send, X, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
  'outline' | 'accent' | 'highlight' | 'secondary' | 'default' | 'destructive'
> = {
  DRAFT: 'outline',
  SENT: 'accent',
  CONFIRMED: 'highlight',
  IN_PROGRESS: 'default',
  COMPLETED: 'outline',
  CANCELLED: 'destructive',
};

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ['CANCELLED'],
  SENT: ['CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const ORDER_FINAL_STATUSES = [OrderStatus.COMPLETED, OrderStatus.CANCELLED] as const;

export const ORDER_STATUS_ACTIVITY_MESSAGES: Record<string, string> = {
  SENT: 'Заказ отправлен клиенту',
  CONFIRMED: 'Клиент подтвердил условия',
  IN_PROGRESS: 'Заказ взят в работу',
  COMPLETED: 'Заказ завершён',
  CANCELLED: 'Заказ отменён',
};

export const ORDER_LINK_COPIED_ACTIVITY_MESSAGE = 'Ссылка на заказ скопирована';

export const ORDER_STATUS_STATIC_ICONS: Record<OrderStatus, LucideIcon> = {
  DRAFT: FileText,
  SENT: Send,
  CONFIRMED: CircleCheck,
  IN_PROGRESS: Zap,
  COMPLETED: CheckCheck,
  CANCELLED: X,
};
