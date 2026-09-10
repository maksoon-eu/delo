import { Badge } from '@/components/ui/data/badge';
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STATIC_ICONS,
  ORDER_STATUS_VARIANTS,
} from '@/constants/orders';
import { cn } from '@/utils/cn';
import type { OrderStatus } from '@prisma/client';
import { ORDER_STATUS_BADGE_CLASS_NAMES } from './status-styles';

type OrderStatusBadgeProps = {
  status: string;
  size?: 'sm';
  className?: string;
};

export function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const { status, size, className } = props;

  return (
    <Badge
      variant={ORDER_STATUS_VARIANTS[status as OrderStatus] ?? 'outline'}
      Icon={ORDER_STATUS_STATIC_ICONS[status as OrderStatus]}
      size={size}
      className={cn(
        'font-semibold',
        ORDER_STATUS_BADGE_CLASS_NAMES[status as OrderStatus],
        className
      )}
    >
      {ORDER_STATUS_LABELS[status as OrderStatus] ?? status}
    </Badge>
  );
}
