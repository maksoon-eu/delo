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
import { Input } from '@/components/ui/form/input';
import { DataTable } from '@/components/ui/data/data-table';
import { Button } from '@/components/ui/actions/button';
import { UserRoundPlusIcon } from '@/components/icons/user-round-plus';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { ClientForm } from '@/components/clients/client-form';
import { getInitials } from '@/lib/utils';
import type { ClientListItem } from '@/types';
import { Building2, CalendarDays, Mail, Phone, Search, User } from 'lucide-react';
import { AnimateIn } from '../ui/feedback/animate-in';

type ClientsTableProps = {
  clients: ClientListItem[];
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
  const { clients } = props;
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const table = useReactTable({
    data: clients,
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
  }

  return (
    <AnimateIn className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Поиск по клиентам"
            value={globalFilter}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        <Button Icon={UserRoundPlusIcon} onClick={handleNewClient}>
          Новый клиент
        </Button>
      </div>

      <DataTable
        table={table}
        emptyMessage={globalFilter ? 'Ничего не найдено' : 'Клиентов пока нет'}
        onRowClick={handleRowClick}
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
