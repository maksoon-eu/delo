import { formatDate, formatPrice } from '@/utils/format';
import { getInitials } from '@/utils/profile';
import { type ClientListItem } from '@/types/clients';
import { type ColumnDef } from '@tanstack/react-table';
import { Building2, CalendarDays, MessageCircle, User, Wallet } from 'lucide-react';

export const columns: ColumnDef<ClientListItem>[] = [
  {
    id: 'avatar',
    header: '',
    cell: ({ row }) => {
      const { name } = row.original;
      return (
        <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full text-xs font-semibold">
          {getInitials(name)}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => (
      <span className="flex items-center gap-1.5">
        <User className="size-3.5" />
        Имя
      </span>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'company',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Building2 className="size-3.5" />
        Компания
      </span>
    ),
    cell: ({ getValue }) => getValue<string | null>() ?? '—',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'contact',
    header: () => (
      <span className="flex items-center gap-1.5">
        <MessageCircle className="size-3.5" />
        Контакт
      </span>
    ),
    cell: ({ getValue }) => getValue<string | null>() ?? '—',
    enableGlobalFilter: true,
    meta: { copyable: true },
  },
  {
    accessorKey: 'totalPaid',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Wallet className="size-3.5" />
        Оплачено
      </span>
    ),
    cell: ({ getValue }) => {
      const val = getValue<number>();
      return val > 0 ? formatPrice(val) : '—';
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Добавлен
      </span>
    ),
    cell: ({ getValue }) => formatDate(getValue<Date>()),
  },
];
