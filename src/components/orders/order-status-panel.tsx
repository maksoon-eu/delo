'use client';

import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { TransitionButton } from '@/components/orders/transition-button';
import { ORDER_STATUS_TRANSITIONS } from '@/constants';
import { OrderStatus } from '@prisma/client';

type OrderStatusPanelProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const { orderId, currentStatus } = props;
  const nextStatuses = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-muted-foreground text-sm">Статус:</span>
      <OrderStatusBadge status={currentStatus} />
      {nextStatuses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {nextStatuses.map((status) => (
            <TransitionButton key={status} orderId={orderId} targetStatus={status} />
          ))}
        </div>
      )}
    </div>
  );
}
