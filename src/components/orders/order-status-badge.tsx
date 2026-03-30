import { Badge } from '@/components/ui/data/badge';
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from '@/constants';

type OrderStatusBadgeProps = {
  status: string;
};

export function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const { status } = props;

  return (
    <Badge
      variant={ORDER_STATUS_VARIANTS[status as keyof typeof ORDER_STATUS_VARIANTS] ?? 'outline'}
    >
      {ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS] ?? status}
    </Badge>
  );
}
