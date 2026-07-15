import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ContentCardProps = ComponentProps<'div'> & {
  children: ReactNode;
  variant?: 'default' | 'solid';
};

export function ContentCard(props: ContentCardProps) {
  const { children, className, variant = 'default', ...rest } = props;

  return (
    <div
      className={cn(
        'p-6',
        variant === 'solid'
          ? 'border-border bg-card/60 rounded-2xl border backdrop-blur-md'
          : 'glass border-glass rounded-xl',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
