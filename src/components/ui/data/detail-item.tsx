import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type DetailItemProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function DetailItem(props: DetailItemProps) {
  const { label, children, className } = props;
  return (
    <div className={cn(className)}>
      <dt className="text-muted-foreground text-xs font-bold">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}
