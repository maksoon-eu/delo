import type { AnimatedIconComponent } from '@/types/icons';
import { CircleCheckIcon } from '@/components/icons/circle-check';
import { CheckCheckIcon } from '@/components/icons/check-check';
import { EyeIcon } from '@/components/icons/eye';
import { FileTextIcon } from '@/components/icons/file-text';
import { XIcon } from '@/components/icons/x';
import { ZapIcon } from '@/components/icons/zap';
import { OrderStatus } from '@prisma/client';
import { CheckCheck, CircleCheck, Eye, FileText, X, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'На проверке',
  CONFIRMED: 'Подтверждён',
  IN_PROGRESS: 'В работе',
  COMPLETED: 'Завершён',
  CANCELLED: 'Отменён',
};

export const ORDER_STATUS_ACTION_LABELS: Record<OrderStatus, string> = {
  DRAFT: 'Черновик',
  SENT: 'На проверку',
  CONFIRMED: 'Подтвердить',
  IN_PROGRESS: 'Взять в работу',
  COMPLETED: 'Завершить',
  CANCELLED: 'Отменить',
};

export const ORDER_STATUS_ICONS: Record<OrderStatus, AnimatedIconComponent> = {
  DRAFT: FileTextIcon,
  SENT: EyeIcon,
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
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['CANCELLED'],
  CONFIRMED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const ORDER_FINAL_STATUSES = [OrderStatus.COMPLETED, OrderStatus.CANCELLED] as const;

export const ORDER_STATUS_ACTIVITY_MESSAGES: Record<string, string> = {
  SENT: 'Заказ переведён на проверку',
  CONFIRMED: 'Клиент подтвердил условия',
  IN_PROGRESS: 'Заказ взят в работу',
  COMPLETED: 'Заказ завершён',
  CANCELLED: 'Заказ отменён',
};

export const ORDER_STATUS_STATIC_ICONS: Record<OrderStatus, LucideIcon> = {
  DRAFT: FileText,
  SENT: Eye,
  CONFIRMED: CircleCheck,
  IN_PROGRESS: Zap,
  COMPLETED: CheckCheck,
  CANCELLED: X,
};
