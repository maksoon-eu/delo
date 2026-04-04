'use client';

import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { TransitionButton } from '@/components/orders/transition-button';
import { ORDER_STATUS_ICONS, ORDER_STATUS_TRANSITIONS } from '@/constants';
import { OrderStatus } from '@prisma/client';

type OrderStatusPanelProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const { orderId, currentStatus } = props;
  const nextStatuses = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Статус:</span>
        <OrderStatusBadge status={currentStatus} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Доступные статусы:</span>
        {nextStatuses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {nextStatuses.map((status) => (
              <TransitionButton
                key={status}
                orderId={orderId}
                targetStatus={status}
                Icon={ORDER_STATUS_ICONS[status]}
              />
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">отсутствуют</span>
        )}
      </div>
    </div>
  );
}
