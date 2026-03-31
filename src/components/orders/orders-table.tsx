'use client';

import { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data/data-table';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { SelectInput } from '@/components/ui/form/fields/select-input';
import { getOrders } from '@/actions/orders';
import { ORDERS_PAGE_SIZE } from '@/constants';
import { useInfiniteList } from '@/hooks/use-infinite-list';
import type { OrderListItem, SelectOption } from '@/types';
import { OrderStatus } from '@prisma/client';
import { ORDERS_TABLE_COLUMNS, ORDER_STATUS_FILTER_OPTIONS } from './constants';
import { FilterCard } from '../ui/data/filter-card';

type OrdersTableProps = {
  initialItems: OrderListItem[];
  initialHasMore: boolean;
};

export function OrdersTable(props: OrdersTableProps) {
  const { initialItems, initialHasMore } = props;
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsStringLiteral(Object.values(OrderStatus))
  );
  const [clientIdFilter] = useQueryState('clientId', { defaultValue: '' });
  const [globalFilter, setGlobalFilter] = useState('');

  const { items, hasMore, isLoadingMore, loadMore } = useInfiniteList<OrderListItem>({
    initialItems,
    initialHasMore,
    fetch: (offset, take) =>
      getOrders({
        offset,
        take,
        status: statusFilter || undefined,
        clientId: clientIdFilter || undefined,
      }),
    pageSize: ORDERS_PAGE_SIZE,
  });

  const table = useReactTable({
    data: items,
    columns: ORDERS_TABLE_COLUMNS,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function handleRowClick(order: OrderListItem) {
    router.push(`/orders/${order.id}`);
  }

  function handleNewOrder() {
    router.push('/orders/new');
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setGlobalFilter(e.target.value);
  }

  function handleStatusChange(option: SelectOption | null) {
    const value = option?.value ?? null;
    setStatusFilter(value === 'ALL' ? null : (value as OrderStatus));
  }

  const statusOption =
    ORDER_STATUS_FILTER_OPTIONS.find((opt) => opt.value === statusFilter) ?? null;

  return (
    <AnimateIn className="flex flex-1 flex-col gap-4">
      <FilterCard
        filterValue={globalFilter}
        onFilterChange={handleSearchChange}
        onBtnAction={handleNewOrder}
        btnLabel="Новый заказ"
        inputLabel="Поиск по заказам"
      >
        <SelectInput
          value={statusOption}
          onValueChange={handleStatusChange}
          options={ORDER_STATUS_FILTER_OPTIONS}
          className="min-w-44"
          label="Фильтр по статусу"
        />
      </FilterCard>

      <DataTable
        table={table}
        emptyMessage={globalFilter || statusFilter ? 'Ничего не найдено' : 'Заказов пока нет'}
        onRowClick={handleRowClick}
        onEndReached={hasMore && !isLoadingMore ? loadMore : undefined}
      />
    </AnimateIn>
  );
}
