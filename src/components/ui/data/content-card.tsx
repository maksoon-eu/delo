import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentCardProps = ComponentProps<'div'> & {
  children: ReactNode;
};

export function ContentCard(props: ContentCardProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={cn('glass border-glass rounded-xl p-6 shadow-sm', className)} {...rest}>
      {children}
    </div>
  );
}
