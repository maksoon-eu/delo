import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

type EmptyListProps = {
  items: unknown[];
  message: string;
  children: ReactNode;
};

export function EmptyList(props: EmptyListProps) {
  const { items, message, children } = props;
  if (items.length === 0) {
    return (
      <div className="border-border bg-sidebar flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center">
        <Inbox className="text-muted-foreground size-5" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    );
  }
  return <>{children}</>;
}
