'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data/data-table';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { UserRoundPlusIcon } from '@/components/icons/user-round-plus';
import { ClientForm } from '@/components/clients/client-form';
import { getClients } from '@/actions/clients';
import { CLIENTS_PAGE_SIZE } from '@/constants/pagination';
import { useInfiniteList } from '@/hooks/use-infinite-list';
import { useRequireVerifiedEmail } from '@/hooks/use-require-verified-email';
import type { ClientListItem } from '@/types/clients';
import { AnimateIn } from '../ui/feedback/animate-in';
import { FilterCard } from '../ui/data/filter-card';
import { columns } from './constants';
import { parseAsString, useQueryState } from 'nuqs';

type ClientsTableProps = {
  initialItems: ClientListItem[];
  initialHasMore: boolean;
};

export function ClientsTable(props: ClientsTableProps) {
  const { initialItems, initialHasMore } = props;
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useQueryState('search', parseAsString.withDefault(''));
  const { items, hasMore, isLoadingMore, loadMore } = useInfiniteList<ClientListItem>({
    initialItems,
    initialHasMore,
    fetch: (offset, take) => getClients({ offset, take, search: searchFilter || undefined }),
    pageSize: CLIENTS_PAGE_SIZE,
    deps: [searchFilter],
  });

  const [createOpen, setCreateOpen] = useState(false);
  const requireVerifiedEmail = useRequireVerifiedEmail();

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handleRowClick(client: ClientListItem) {
    router.push(`/clients/${client.id}`);
  }

  function handleNewClient() {
    if (!requireVerifiedEmail()) return;

    setCreateOpen(true);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchFilter(e.target.value);
  }

  function handleCreateSuccess() {
    setCreateOpen(false);
    router.refresh();
  }

  return (
    <AnimateIn className="flex flex-1 flex-col space-y-4">
      <div className="flex justify-end">
        <FilterCard
          filterValue={searchFilter}
          onFilterChange={handleSearchChange}
          onBtnAction={handleNewClient}
          btnLabel="Новый клиент"
          inputLabel="Поиск по клиентам..."
        />
      </div>

      <DataTable
        table={table}
        emptyMessage={searchFilter ? 'Ничего не найдено' : 'Клиентов пока нет'}
        onRowClick={handleRowClick}
        onEndReached={hasMore && !isLoadingMore ? loadMore : undefined}
        isLoadingMore={isLoadingMore}
      />

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
        Icon={UserRoundPlusIcon}
        size="lg"
        variant="solid"
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </AnimateIn>
  );
}
