import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type FormSectionProps = ComponentProps<'div'> & {
  title: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  action?: ReactNode;
  children: ReactNode;
};

export function FormSection(props: FormSectionProps) {
  const { title, Icon, action, children, className, ...rest } = props;

  return (
    <div className={cn('border-border bg-card rounded-2xl border p-4', className)} {...rest}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="bg-muted text-primary flex size-7 shrink-0 items-center justify-center rounded-lg">
            <Icon size={15} />
          </div>
          <h3 className="truncate text-sm font-semibold">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
