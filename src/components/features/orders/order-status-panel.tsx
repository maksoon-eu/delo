'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from '@/components/features/orders/order-link-actions';
import { OrderStatusBadge } from '@/components/features/orders/order-status-badge';
import { OrderStatusPanelCard } from '@/components/features/orders/order-status-panel-card';
import { TransitionButton } from '@/components/features/orders/transition-button';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { ORDER_STATUS_ICONS, ORDER_STATUS_TRANSITIONS } from '@/constants/orders';
import type { OrderStatus } from '@prisma/client';

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

  return (
    <div className="border-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <OrderStatusPanelCard
          title="Текущий статус"
          className="sm:min-w-45"
          contentClassName="mt-4"
        >
          <OrderStatusBadge status={currentStatus} />
        </OrderStatusPanelCard>

        {nextStatuses.length > 0 && (
          <OrderStatusPanelCard
            title="Доступные действия"
            className="sm:min-w-80"
            contentClassName="mt-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              {nextStatuses.map((status) => (
                <TransitionButton
                  key={status}
                  orderId={orderId}
                  targetStatus={status}
                  Icon={ORDER_STATUS_ICONS[status]}
                />
              ))}
            </div>
          </OrderStatusPanelCard>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <OrderLinkActions publicOrderUrl={publicOrderUrl} size="sm" />

        {canEditOrder && (
          <Button
            render={<Link href={editHref} />}
            nativeButton={false}
            variant="outline"
            size="sm"
            Icon={ArrowRightIcon}
          >
            Редактировать
          </Button>
        )}
      </div>
    </div>
  );
}
