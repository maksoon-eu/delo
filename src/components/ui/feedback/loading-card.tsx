import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type LoadingCardProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function LoadingCard(props: LoadingCardProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn(
        'surface-shadow border-border bg-secondary/30 dark:bg-card rounded-2xl border p-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
