'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from '@/components/orders/order-link-actions';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { TransitionButton } from '@/components/orders/transition-button';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { ORDER_STATUS_ICONS, ORDER_STATUS_TRANSITIONS } from '@/constants/orders';
import { OrderStatus } from '@prisma/client';

type OrderStatusPanelProps = {
  orderId: string;
  currentStatus: OrderStatus;
  publicOrderUrl: string;
  canEditOrder: boolean;
  editHref: Route<string>;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const { orderId, currentStatus, publicOrderUrl, canEditOrder, editHref } = props;
  const nextStatuses = ORDER_STATUS_TRANSITIONS[currentStatus] ?? [];
  const controlClassName = 'w-full sm:w-56';
  const actionClassName = 'w-full sm:w-auto sm:min-w-44';

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">Действия по заказу</h2>
        {canEditOrder && (
          <Link href={editHref}>
            <Button variant="outline" Icon={ArrowRightIcon}>
              Редактировать
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium">Текущий статус</p>
          <div className="mt-2 flex min-h-9 items-center">
            <OrderStatusBadge status={currentStatus} className={controlClassName} />
          </div>
        </div>

        {nextStatuses.length > 0 && (
          <div className="border-border/60 min-w-0 border-t pt-5 lg:border-t-0 lg:pt-0">
            <p className="text-muted-foreground text-xs font-medium">Следующее действие</p>

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
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
}
