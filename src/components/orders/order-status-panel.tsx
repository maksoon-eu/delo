'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from '@/components/orders/order-link-actions';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { TransitionButton } from '@/components/orders/transition-button';
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
        <div className="border-primary/30 bg-primary/5 rounded-lg border px-3 py-2">
          <p className="text-muted-foreground text-xs font-medium">Текущий статус</p>
          <div className="mt-2">
            <OrderStatusBadge status={currentStatus} />
          </div>
        </div>

        {nextStatuses.length > 0 && (
          <div className="border-border bg-card/30 rounded-lg border px-3 py-2">
            <p className="text-muted-foreground text-xs font-medium">Доступные действия</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {nextStatuses.map((status) => (
                <TransitionButton
                  key={status}
                  orderId={orderId}
                  targetStatus={status}
                  Icon={ORDER_STATUS_ICONS[status]}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <OrderLinkActions publicOrderUrl={publicOrderUrl} size="sm" />

        {canEditOrder && (
          <Link href={editHref}>
            <Button variant="outline" size="sm" Icon={ArrowRightIcon}>
              Редактировать
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
