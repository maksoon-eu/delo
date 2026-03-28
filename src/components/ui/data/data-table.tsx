'use client';

import { forwardRef, type ComponentProps } from 'react';
import {
  flexRender,
  type Row,
  type RowData,
  type Table as TanstackTable,
} from '@tanstack/react-table';
import { TableVirtuoso, type ItemProps, type TableComponents } from 'react-virtuoso';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/actions/button';
import { TableCell, TableHead, TableRow } from './table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    copyable?: boolean;
  }
}

type TableContext = {
  onRowClick?: (data: unknown) => void;
  emptyMessage: string;
  columnCount: number;
};

const VirtuosoTable = forwardRef<HTMLTableElement, ComponentProps<'table'>>(
  ({ className, style, ...props }, ref) => (
    <table
      data-slot="table"
      ref={ref}
      style={style}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
);
VirtuosoTable.displayName = 'VirtuosoTable';

const VirtuosoTableHead = forwardRef<HTMLTableSectionElement, ComponentProps<'thead'>>(
  ({ className, ...props }, ref) => (
    <thead
      data-slot="table-header"
      ref={ref}
      className={cn('bg-card [&_tr]:border-b [&_tr]:hover:bg-transparent', className)}
      {...props}
    />
  )
);
VirtuosoTableHead.displayName = 'VirtuosoTableHead';

const VirtuosoTableBody = forwardRef<HTMLTableSectionElement, ComponentProps<'tbody'>>(
  ({ className, ...props }, ref) => (
    <tbody data-slot="table-body" ref={ref} className={className} {...props} />
  )
);
VirtuosoTableBody.displayName = 'VirtuosoTableBody';

function VirtuosoTableRow({
  context,
  item: row,
  ...rest
}: ItemProps<Row<unknown>> & { context?: TableContext }) {
  return (
    <TableRow
      className={cn('group', context?.onRowClick && 'cursor-pointer')}
      onClick={context?.onRowClick ? () => context.onRowClick!(row.original) : undefined}
      {...rest}
    />
  );
}

function VirtuosoEmptyPlaceholder({ context }: { context?: TableContext }) {
  return (
    <tbody>
      <TableRow>
        <TableCell
          colSpan={context?.columnCount ?? 1}
          className="text-muted-foreground py-8 text-center"
        >
          {context?.emptyMessage ?? ''}
        </TableCell>
      </TableRow>
    </tbody>
  );
}

const VIRTUOSO_COMPONENTS: TableComponents<Row<unknown>, TableContext> = {
  Table: VirtuosoTable as TableComponents<Row<unknown>, TableContext>['Table'],
  TableHead: VirtuosoTableHead as TableComponents<Row<unknown>, TableContext>['TableHead'],
  TableBody: VirtuosoTableBody as TableComponents<Row<unknown>, TableContext>['TableBody'],
  TableRow: VirtuosoTableRow,
  EmptyPlaceholder: VirtuosoEmptyPlaceholder,
};

type DataTableProps<T> = {
  table: TanstackTable<T>;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  onEndReached?: () => void;
  height?: number | string;
};

export function DataTable<T>(props: DataTableProps<T>) {
  const {
    table,
    emptyMessage = 'Нет данных',
    onRowClick,
    className,
    onEndReached,
    height = 600,
  } = props;

  const context: TableContext = {
    onRowClick: onRowClick as TableContext['onRowClick'],
    emptyMessage,
    columnCount: table.getVisibleLeafColumns().length,
  };

  const data = table.getRowModel().rows;

  return (
    <div className={cn('glass flex flex-1 flex-col overflow-hidden rounded-xl border', className)}>
      <TableVirtuoso
        data={data as Row<unknown>[]}
        context={context}
        style={{ height }}
        overscan={200}
        initialItemCount={data.length}
        endReached={onEndReached}
        components={VIRTUOSO_COMPONENTS}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))
        }
        itemContent={(_, row) => (
          <>
            {(row as Row<T>).getVisibleCells().map((cell) => {
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
          </>
        )}
      />
    </div>
  );
}
