'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

function Table(props: ComponentProps<'table'>) {
  const { className, ...rest } = props;

  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...rest}
      />
    </div>
  );
}

function TableHeader(props: ComponentProps<'thead'>) {
  const { className, ...rest } = props;

  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b [&_tr]:hover:bg-transparent', className)}
      {...rest}
    />
  );
}

function TableBody(props: ComponentProps<'tbody'>) {
  const { className, ...rest } = props;

  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...rest}
    />
  );
}

function TableFooter(props: ComponentProps<'tfoot'>) {
  const { className, ...rest } = props;

  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...rest}
    />
  );
}

function TableRow(props: ComponentProps<'tr'>) {
  const { className, ...rest } = props;

  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-accent/20 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...rest}
    />
  );
}

function TableHead(props: ComponentProps<'th'>) {
  const { className, ...rest } = props;

  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...rest}
    />
  );
}

function TableCell(props: ComponentProps<'td'>) {
  const { className, ...rest } = props;

  return (
    <td
      data-slot="table-cell"
      className={cn('whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...rest}
    />
  );
}

function TableCaption(props: ComponentProps<'caption'>) {
  const { className, ...rest } = props;

  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...rest}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
