'use client';

import { List } from 'lucide-react';
import { ClientForm } from '@/components/features/clients/client-form';
import { ClientOrderItem } from '@/components/features/clients/client-order-item';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import { SectionCard } from '@/components/ui/data/section-card';
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

      <SectionCard
        title="Заказы"
        Icon={List}
        action={<span className="text-muted-foreground text-sm">{client.ordersTotal}</span>}
        className="flex min-h-48 flex-1 flex-col"
      >
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <EmptyList items={client.orders} message="Заказов пока нет">
            <div className="space-y-2">
              {client.orders.map((order) => (
                <ClientOrderItem key={order.id} order={order} clientId={client.id} />
              ))}
            </div>
          </EmptyList>
        </div>
      </SectionCard>
    </div>
  );
}
