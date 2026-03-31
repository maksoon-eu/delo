'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DataTable } from '@/components/ui/data/data-table';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { ClientForm } from '@/components/clients/client-form';
import { getInitials } from '@/lib/utils';
import { getClients } from '@/actions/clients';
import { CLIENTS_PAGE_SIZE } from '@/constants';
import { useInfiniteList } from '@/hooks/use-infinite-list';
import type { ClientListItem } from '@/types';
import { Building2, CalendarDays, Mail, Phone, User, Wallet } from 'lucide-react';
import { AnimateIn } from '../ui/feedback/animate-in';
import { FilterCard } from '../ui/data/filter-card';

type ClientsTableProps = {
  initialItems: ClientListItem[];
  initialHasMore: boolean;
};

const columns: ColumnDef<ClientListItem>[] = [
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

export function ClientsTable(props: ClientsTableProps) {
  const { initialItems, initialHasMore } = props;
  const router = useRouter();
  const { items, hasMore, isLoadingMore, loadMore } = useInfiniteList<ClientListItem>({
    initialItems,
    initialHasMore,
    fetch: (offset, take) => getClients({ offset, take }),
    pageSize: CLIENTS_PAGE_SIZE,
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const table = useReactTable({
    data: items,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handleRowClick(client: ClientListItem) {
    router.push(`/clients/${client.id}`);
  }

  function handleNewClient() {
    setCreateOpen(true);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setGlobalFilter(e.target.value);
  }

  function handleCreateSuccess() {
    setCreateOpen(false);
    router.refresh();
  }

  return (
    <AnimateIn className="flex flex-1 flex-col space-y-4">
      <FilterCard
        filterValue={globalFilter}
        onFilterChange={handleSearchChange}
        onBtnAction={handleNewClient}
        btnLabel="Новый клиент"
        inputLabel="Поиск по клиентам"
      />

      <DataTable
        table={table}
        emptyMessage={globalFilter ? 'Ничего не найдено' : 'Клиентов пока нет'}
        onRowClick={handleRowClick}
        onEndReached={hasMore && !isLoadingMore ? loadMore : undefined}
      />

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </AnimateIn>
  );
}
