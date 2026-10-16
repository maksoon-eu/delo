import type { ClientListItem } from '@/shared/types/clients';

export type ClientsListOptions = {
  initialItems: ClientListItem[];
  initialHasMore: boolean;
};
