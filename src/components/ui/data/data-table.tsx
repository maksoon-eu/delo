'use client';

import {
  flexRender,
  type Row,
  type RowData,
  type Table as TanstackTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/actions/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    copyable?: boolean;
  }
}

type DataTableProps<T> = {
  table: TanstackTable<T>;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
};

type DataTableRowProps<T> = {
  row: Row<T>;
  onRowClick?: (row: T) => void;
};

function DataTableRow<T>(props: DataTableRowProps<T>) {
  const { row, onRowClick } = props;

  function handleRowClick() {
    onRowClick?.(row.original);
  }

  return (
    <TableRow
      className={cn('group', onRowClick && 'cursor-pointer')}
      onClick={onRowClick ? handleRowClick : undefined}
    >
      {row.getVisibleCells().map((cell) => {
        const rawValue = cell.getValue();
        const isCopyable =
          cell.column.columnDef.meta?.copyable && rawValue != null && rawValue !== '';

        return (
          <TableCell key={cell.id}>
            <div className="flex items-center">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
              {isCopyable && (
                <Button
                  mode="copy"
                  copyValue={String(rawValue)}
                  size="icon-xs"
                  variant="ghost"
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                />
              )}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export function DataTable<T>(props: DataTableProps<T>) {
  const { table, emptyMessage = 'Нет данных', onRowClick, className } = props;

  return (
    <div className={cn('glass rounded-xl border', className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table
              .getRowModel()
              .rows.map((row) => <DataTableRow key={row.id} row={row} onRowClick={onRowClick} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleLeafColumns().length}
                className="text-muted-foreground py-8 text-center"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
