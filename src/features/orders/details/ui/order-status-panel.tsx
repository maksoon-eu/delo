'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { OrderLinkActions } from './order-link-actions';
import { OrderStatusBadge } from '@/features/orders/common/ui/order-status-badge';
import { OrderStatusPanelCard } from './order-status-panel-card';
import { TransitionButton } from './transition-button';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import type { OrderStatus } from '@prisma/client';
import type { OrderTransitionAction } from '../types';

type OrderStatusPanelProps = {
  currentStatus: OrderStatus;
  publicOrderUrl: string;
  canEditOrder: boolean;
  editHref: Route<string>;
  actions: readonly OrderTransitionAction[];
  onTransition: (action: OrderTransitionAction) => void;
};

export function OrderStatusPanel(props: OrderStatusPanelProps) {
  const { currentStatus, publicOrderUrl, canEditOrder, editHref, actions, onTransition } = props;

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

        {actions.length > 0 && (
          <OrderStatusPanelCard
            title="Доступные действия"
            className="sm:min-w-80"
            contentClassName="mt-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              {actions.map((action) => (
                <TransitionButton
                  key={action.targetStatus}
                  action={action}
                  onTransition={onTransition}
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
