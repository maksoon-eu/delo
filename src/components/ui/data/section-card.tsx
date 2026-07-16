import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type SectionCardProps = ComponentProps<'div'> & {
  title: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  action?: ReactNode;
  titleClassName?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
  truncateTitle?: boolean;
  children: ReactNode;
};

export function SectionCard(props: SectionCardProps) {
  const {
    title,
    Icon,
    action,
    titleClassName,
    titleAs: Title = 'h3',
    truncateTitle = true,
    children,
    className,
    ...rest
  } = props;

  return (
    <div
      className={cn(
        'surface-shadow border-border bg-secondary/30 dark:bg-card rounded-2xl border p-4',
        className
      )}
      {...rest}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="bg-muted text-primary flex size-7 shrink-0 items-center justify-center rounded-lg">
            <Icon size={15} />
          </div>
          <Title
            className={cn('text-sm font-semibold', truncateTitle && 'truncate', titleClassName)}
          >
            {title}
          </Title>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
