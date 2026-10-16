import type { OrderInput } from '@/shared/schemas/orders';

export const ORDER_ITEM_DEFAULT = {
  name: '',
  description: '',
  price: '',
};

export const ORDER_CREATE_DEFAULT_VALUES: OrderInput = {
  clientId: '',
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  paymentMethod: null,
  items: [ORDER_ITEM_DEFAULT],
};
