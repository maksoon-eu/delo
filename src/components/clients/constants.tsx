import { getInitials } from '@/lib/utils';
import { type ClientListItem } from '@/types';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Building2, CalendarDays, Mail, Phone, User, Wallet } from 'lucide-react';

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
    accessorKey: 'email',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Mail className="size-3.5" />
        Email
      </span>
    ),
    cell: ({ getValue }) => getValue<string | null>() ?? '—',
    enableGlobalFilter: true,
    meta: { copyable: true },
  },
  {
    accessorKey: 'phone',
    header: () => (
      <span className="flex items-center gap-1.5">
        <Phone className="size-3.5" />
        Телефон
      </span>
    ),
    cell: ({ getValue }) => getValue<string | null>() ?? '—',
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
      return val > 0 ? val.toLocaleString('ru-RU') + ' ₽' : '—';
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
    cell: ({ getValue }) => format(getValue<Date>(), 'd MMM yyyy', { locale: ru }),
  },
];
