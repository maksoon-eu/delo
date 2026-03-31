import { ComponentProps, ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FormSectionProps = ComponentProps<'div'> & {
  title: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
};

export function FormSection(props: FormSectionProps) {
  const { title, Icon, children, className, ...rest } = props;

  return (
    <div className={cn('bg-card border-glass rounded-xl p-5', className)} {...rest}>
      <div className="mb-4 flex items-center gap-2.5">
        <div className="bg-muted text-primary flex size-7 items-center justify-center rounded-lg">
          <Icon size={15} />
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
