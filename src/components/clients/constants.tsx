import { formatDate, formatPrice } from '@/utils/format';
import { getInitials } from '@/utils/profile';
import { type ClientListItem } from '@/types/clients';
import { type ColumnDef } from '@tanstack/react-table';
import { Building2, CalendarDays, MessageCircle, User, Wallet } from 'lucide-react';

export const columns: ColumnDef<ClientListItem>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <User className="size-3.5" />
        Имя
      </span>
    ),
    size: 260,
    cell: ({ row }) => {
      const { name } = row.original;

      return (
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
            {getInitials(name)}
          </div>
          <span className="text-foreground truncate font-medium">{name}</span>
        </div>
      );
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'company',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <Building2 className="size-3.5" />
        Компания
      </span>
    ),
    size: 220,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<string | null>() ?? '—'}</span>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'contact',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="size-3.5" />
        Контакт
      </span>
    ),
    size: 240,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground">{getValue<string | null>() ?? '—'}</span>
    ),
    enableGlobalFilter: true,
    meta: { copyable: true },
  },
  {
    accessorKey: 'totalPaid',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <Wallet className="size-3.5" />
        Оплачено
      </span>
    ),
    size: 160,
    cell: ({ getValue }) => {
      const val = getValue<number>();
      return <span className="font-medium tabular-nums">{val > 0 ? formatPrice(val) : '—'}</span>;
    },
    meta: { align: 'right' },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" />
        Добавлен
      </span>
    ),
    size: 160,
    cell: ({ getValue }) => (
      <span className="text-muted-foreground tabular-nums">{formatDate(getValue<Date>())}</span>
    ),
    meta: { align: 'right' },
  },
];
