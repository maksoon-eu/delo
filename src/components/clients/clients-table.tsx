'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data/data-table';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { ClientForm } from '@/components/clients/client-form';
import { getClients } from '@/actions/clients';
import { CLIENTS_PAGE_SIZE, NAV_ITEMS } from '@/constants';
import { useInfiniteList } from '@/hooks/use-infinite-list';
import type { ClientListItem } from '@/types';
import { AnimateIn } from '../ui/feedback/animate-in';
import { FilterCard } from '../ui/data/filter-card';
import { columns } from './constants';

type ClientsTableProps = {
  initialItems: ClientListItem[];
  initialHasMore: boolean;
};

const item = NAV_ITEMS.clients;

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
        Icon={item.Icon}
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </AnimateIn>
  );
}
