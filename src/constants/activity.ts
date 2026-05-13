import { ActivityType } from '@prisma/client';
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
