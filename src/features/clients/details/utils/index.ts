import type { ClientInput } from '@/shared/schemas/clients';
import type { ClientDetails } from '@/shared/types/clients';

export function clientToFormValues(client: ClientDetails): ClientInput {
  return {
    name: client.name,
    contact: client.contact ?? '',
    company: client.company ?? '',
    inn: client.inn ?? '',
    notes: client.notes ?? '',
  };
}
