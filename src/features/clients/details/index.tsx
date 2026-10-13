'use client';

import type { ClientDetails } from '@/shared/types/clients';
import { ClientForm } from '../editor';
import { clientToFormValues } from './utils';
import { ClientDetailsView } from './ui/client-details-view';

type ClientCardContentProps = { client: ClientDetails };

export function ClientCardContent(props: ClientCardContentProps) {
  const { client } = props;
  const defaultValues = clientToFormValues(client);

  return (
    <ClientDetailsView
      client={client}
      editor={<ClientForm mode="edit" clientId={client.id} defaultValues={defaultValues} />}
    />
  );
}
