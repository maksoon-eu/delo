'use client';

import { OrderLinkActions } from '@/components/orders/order-link-actions';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { TransitionButton } from '@/components/orders/transition-button';
import { ORDER_STATUS_ICONS, ORDER_STATUS_TRANSITIONS } from '@/constants/orders';
import { OrderStatus } from '@prisma/client';

type OrderStatusPanelProps = {
  orderId: string;
  currentStatus: OrderStatus;
  publicOrderUrl: string;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const { orderId, currentStatus, publicOrderUrl } = props;
  const nextStatuses = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];
  const publicOrderLabel = publicOrderUrl.replace(/^https?:\/\//, '');
  const controlClassName = 'w-full sm:w-56';
  const actionClassName = 'w-full sm:w-auto sm:min-w-44';

  return (
    <div>
      <h2 className="mb-4 font-semibold">Действия по заказу</h2>

      <div className="grid gap-5 lg:grid-cols-[minmax(12rem,0.75fr)_minmax(24rem,1.55fr)_minmax(16rem,1fr)]">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium">Текущий статус</p>
          <div className="mt-2 flex min-h-9 items-center">
            <OrderStatusBadge status={currentStatus} className={controlClassName} />
          </div>
        </div>

        <div className="border-border/60 min-w-0 border-t pt-5 lg:border-t-0 lg:pt-0">
          <p className="text-muted-foreground text-xs font-medium">Следующее действие</p>
          {nextStatuses.length > 0 ? (
            <div className="mt-2 flex min-h-9 flex-wrap items-center gap-2 sm:flex-nowrap">
              {nextStatuses.map((status) => (
                <TransitionButton
                  key={status}
                  orderId={orderId}
                  targetStatus={status}
                  Icon={ORDER_STATUS_ICONS[status]}
                  className={actionClassName}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-2 flex min-h-9 items-center text-sm">
              Нет доступных переходов
            </p>
          )}
        </div>

        <div className="border-border/60 min-w-0 border-t pt-5 lg:border-t-0 lg:pt-0">
          <p className="text-muted-foreground text-xs font-medium">Клиентская ссылка</p>
          <div className="mt-2 flex min-h-9 items-center">
            <OrderLinkActions
              orderId={orderId}
              publicOrderUrl={publicOrderUrl}
              currentStatus={currentStatus}
              className={controlClassName}
            />
          </div>
          <p className="text-muted-foreground mt-2 truncate text-xs" title={publicOrderUrl}>
            {publicOrderLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
