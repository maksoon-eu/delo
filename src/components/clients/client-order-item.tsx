import Link from 'next/link';
import { ORDER_STATUS_LABELS } from '@/constants/orders';
import { formatDate, formatPrice } from '@/utils/format';
import type { ClientOrderSummary } from '@/types/clients';

type ClientOrderItemProps = {
  order: ClientOrderSummary;
};

export function ClientOrderItem(props: ClientOrderItemProps) {
  const { order } = props;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="bg-muted/40 hover:bg-muted focus-visible:ring-ring block rounded-lg px-3 py-2 outline-none transition-colors focus-visible:ring-2"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{order.title}</span>
        <span className="shrink-0 text-sm font-semibold">{formatPrice(order.price)}</span>
      </div>
      <div className="mt-0.5 flex items-center justify-between">
        <span className="text-muted-foreground text-xs">{formatDate(order.createdAt)}</span>
        <span className="text-muted-foreground text-xs">
          {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </span>
      </div>
    </Link>
  );
}
