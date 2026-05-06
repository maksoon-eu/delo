import { format } from 'date-fns';
import { FileText, CalendarDays, Tag, UserRound, Banknote } from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
import { type ColumnDef } from '@tanstack/react-table';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { ORDER_STATUS_LABELS } from '@/constants';
import type { OrderListItem, OrderDetails, SelectOption } from '@/types';
import type { OrderInput } from '@/schemas/orders';

export const ORDER_STATUS_FILTER_OPTIONS: SelectOption[] = [
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
    cell: ({ row }) => <OrderStatusBadge size="sm" status={row.original.status} />,
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
      const { price } = row.original;
      return price != null ? formatPrice(price) : '—';
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
      return val ? formatDate(val) : '—';
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
    cell: ({ getValue }) => formatDate(getValue<Date>()),
  },
];

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
  price: '',
  paymentMethod: null,
  items: [ORDER_ITEM_DEFAULT],
};

export function orderToFormValues(order: OrderDetails): OrderInput {
  return {
    clientId: order.clientId,
    title: order.title,
    description: order.description ?? '',
    startDate: order.startDate ? format(order.startDate, 'yyyy-MM-dd') : '',
    deadline: order.deadline ? format(order.deadline, 'yyyy-MM-dd') : '',
    price: order.price ?? '',
    paymentMethod: order.paymentMethod,
    items: order.items.map((i) => ({
      id: i.id,
      name: i.name,
      description: i.description,
      price: i.price,
    })),
  };
}
