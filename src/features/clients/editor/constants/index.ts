import type { ClientInput } from '@/shared/schemas/clients';

export const CLIENT_CREATE_DEFAULT_VALUES: ClientInput = {
  name: '',
  contact: '',
  company: '',
  inn: '',
  notes: '',
};
