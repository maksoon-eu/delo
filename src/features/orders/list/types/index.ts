import type { OrderListItem } from '@/shared/types/orders';

export type OrdersListOptions = {
  initialItems: OrderListItem[];
  initialHasMore: boolean;
};
