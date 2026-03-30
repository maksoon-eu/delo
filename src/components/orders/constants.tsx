import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FileText, CalendarDays, Tag, UserRound, Banknote } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { ORDER_STATUS_LABELS } from '@/constants';
import type { OrderListItem, OrderDetails } from '@/types';
import type { OrderInput } from '@/schemas/orders';

export const ORDER_STATUS_FILTER_OPTIONS = [
  { value: 'ALL', label: 'Все статусы' },
  ...Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

export const ORDERS_TABLE_COLUMNS: ColumnDef<OrderListItem>[] = [
  {
    id: 'status',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Tag className="size-3.5" />
        Статус
      </span>
    ),
    cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'title',
    header: () => (
      <span className="flex items-center gap-1.5">
        <FileText className="size-3.5" />
        Заказ
      </span>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'clientName',
    header: () => (
      <span className="flex items-center gap-1.5">
        <UserRound className="size-3.5" />
        Клиент
      </span>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'price',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Banknote className="size-3.5" />
        Стоимость
      </span>
    ),
    cell: ({ row }) => {
      const { price, currency } = row.original;
      return price != null ? `${price.toLocaleString('ru-RU')} ${currency}` : '—';
    },
  },
  {
    accessorKey: 'deadline',
    header: () => (
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Дедлайн
      </span>
    ),
    cell: ({ getValue }) => {
      const val = getValue<Date | null>();
      return val ? format(val, 'd MMM yyyy', { locale: ru }) : '—';
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Создан
      </span>
    ),
    cell: ({ getValue }) => format(getValue<Date>(), 'd MMM yyyy', { locale: ru }),
  },
];

export const ORDER_CREATE_DEFAULT_VALUES: OrderInput = {
  clientId: '',
  title: '',
  description: '',
  startDate: '',
  deadline: '',
  price: null,
  currency: 'RUB',
  paymentDetails: '',
  items: [],
};

export const ORDER_ITEM_DEFAULT = {
  name: '',
  description: '',
  quantity: 1,
  unit: 'шт',
  price: 0,
};

export function orderToFormValues(order: OrderDetails): OrderInput {
  return {
    clientId: order.clientId,
    title: order.title,
    description: order.description ?? '',
    startDate: order.startDate ? format(order.startDate, 'yyyy-MM-dd') : '',
    deadline: order.deadline ? format(order.deadline, 'yyyy-MM-dd') : '',
    price: order.price,
    currency: order.currency,
    paymentDetails: order.paymentDetails ?? '',
    items: order.items.map((i) => ({
      id: i.id,
      name: i.name,
      description: i.description,
      quantity: i.quantity,
      unit: i.unit,
      price: i.price,
    })),
  };
}
