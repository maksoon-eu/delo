import type { ReactNode } from 'react';

type EmptyListProps = {
  items: unknown[];
  message: string;
  children: ReactNode;
};

export function EmptyList(props: EmptyListProps) {
  const { items, message, children } = props;
  if (items.length === 0) {
    return <p className="text-muted-foreground text-sm">{message}</p>;
  }
  return <>{children}</>;
}
