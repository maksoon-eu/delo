'use client';

import Link from 'next/link';
import { ClientForm } from '@/components/clients/client-form';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { Button } from '@/components/ui/actions/button';
import { ORDER_STATUS_LABELS } from '@/constants';
import { cn, formatDate, formatPrice, getInitials } from '@/lib/utils';
import type { ClientInput } from '@/schemas/clients';
import type { ClientDetails } from '@/types';

type ClientCardContentProps = {
  client: ClientDetails;
  onSuccess?: () => void;
  constrainedHeight?: boolean;
};

export function ClientCardContent(props: ClientCardContentProps) {
  const { client, onSuccess, constrainedHeight = false } = props;

  const defaultValues: ClientInput = {
    name: client.name,
    email: client.email ?? '',
    phone: client.phone ?? '',
    company: client.company ?? '',
    inn: client.inn ?? '',
    notes: client.notes ?? '',
  };

  return (
    <div
      className={cn('space-y-6', constrainedHeight && 'max-h-[calc(100dvh-200px)] overflow-y-auto')}
    >
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full text-sm font-semibold">
          {getInitials(client.name)}
        </div>
        <div>
          <p className="font-semibold">{client.name}</p>
          {client.email && <p className="text-muted-foreground text-sm">{client.email}</p>}
        </div>
      </div>

      <ClientForm
        mode="edit"
        clientId={client.id}
        defaultValues={defaultValues}
        onSuccess={onSuccess}
      />

      <div className="border-t pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Заказы</h3>
          <span className="text-muted-foreground text-sm">{client.ordersTotal}</span>
        </div>

        {client.orders.length > 0 ? (
          <div className="space-y-2">
            {client.orders.map((order) => (
              <div key={order.id} className="bg-muted/40 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{order.title}</span>
                  <span className="shrink-0 text-sm font-semibold">{formatPrice(order.price)}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">
                    {formatDate(order.createdAt)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>
              </div>
            ))}

            <Link href={`/orders?clientId=${client.id}`}>
              <Button variant="ghost" size="sm" Icon={ArrowRightIcon}>
                Все заказы
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Заказов пока нет</p>
        )}
      </div>
    </div>
  );
}
