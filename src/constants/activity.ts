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
import type { ActivityType } from '@prisma/client';

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  DRAFT: 'Заказ создан',
  SENT: 'Заказ переведён на проверку',
  CONFIRMED: 'Клиент подтвердил условия',
  IN_PROGRESS: 'Заказ взят в работу',
  COMPLETED: 'Заказ завершён',
  CANCELLED: 'Заказ отменён',
  NOTE: 'Добавлена заметка',
  PAYMENT: 'Получена оплата',
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
