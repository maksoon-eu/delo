'use client';

import Link from 'next/link';
import { List } from 'lucide-react';
import { ClientForm } from '@/components/clients/client-form';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import { FormSection } from '@/components/ui/form/form-section';
import { ORDER_STATUS_LABELS } from '@/constants/orders';
import { formatDate, formatPrice } from '@/utils/format';
import type { ClientInput } from '@/schemas/clients';
import type { ClientDetails } from '@/types/clients';

type ClientCardContentProps = {
  client: ClientDetails;
};

export function ClientCardContent(props: ClientCardContentProps) {
  const { client } = props;

  const defaultValues: ClientInput = {
    name: client.name,
    contact: client.contact ?? '',
    company: client.company ?? '',
    inn: client.inn ?? '',
    notes: client.notes ?? '',
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <ClientForm mode="edit" clientId={client.id} defaultValues={defaultValues} />

      <FormSection
        title="Заказы"
        Icon={List}
        action={<span className="text-muted-foreground text-sm">{client.ordersTotal}</span>}
        className="flex min-h-48 flex-1 flex-col"
      >
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <EmptyList items={client.orders} message="Заказов пока нет">
            <div className="space-y-2">
              {client.orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="bg-muted/40 hover:bg-muted focus-visible:ring-ring block rounded-lg px-3 py-2 outline-none transition-colors focus-visible:ring-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{order.title}</span>
                    <span className="shrink-0 text-sm font-semibold">
                      {formatPrice(order.price)}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </EmptyList>
        </div>
      </FormSection>
    </div>
  );
}
