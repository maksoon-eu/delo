import { format } from 'date-fns';
import type { OrderDetails } from '@/shared/types/orders';
import type { OrderInput } from '@/shared/schemas/orders';

export function orderToFormValues(order: OrderDetails): OrderInput {
  return {
    clientId: order.clientId,
    title: order.title,
    description: order.description ?? '',
    startDate: order.startDate ? format(order.startDate, 'yyyy-MM-dd') : '',
    deadline: order.deadline ? format(order.deadline, 'yyyy-MM-dd') : '',
    paymentMethod: order.paymentMethod,
    items: order.items.map((i) => ({
      id: i.id,
      name: i.name,
      description: i.description,
      price: i.price,
    })),
  };
}
