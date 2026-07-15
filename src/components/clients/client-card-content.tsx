'use client';

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
    <div className="space-y-4">
      <ClientForm mode="edit" clientId={client.id} defaultValues={defaultValues} />

      <FormSection
        title="Заказы"
        Icon={List}
        action={<span className="text-muted-foreground text-sm">{client.ordersTotal}</span>}
      >
        <EmptyList items={client.orders} message="Заказов пока нет">
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
          </div>
        </EmptyList>
      </FormSection>
    </div>
  );
}
