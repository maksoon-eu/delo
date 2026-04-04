import { Badge } from '@/components/ui/data/badge';
import { ORDER_STATUS_LABELS, ORDER_STATUS_STATIC_ICONS, ORDER_STATUS_VARIANTS } from '@/constants';
import { OrderStatus } from '@prisma/client';

type OrderStatusBadgeProps = {
  status: string;
  size?: 'sm';
};

export function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const { status, size } = props;

  return (
    <Badge
      variant={ORDER_STATUS_VARIANTS[status as OrderStatus] ?? 'outline'}
      Icon={ORDER_STATUS_STATIC_ICONS[status as OrderStatus]}
      size={size}
    >
      {ORDER_STATUS_LABELS[status as OrderStatus] ?? status}
    </Badge>
  );
}
