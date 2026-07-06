import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import type { ComponentProps } from 'react';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  containerClassName?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { className, containerClassName, disabled, ...rest } = props;

  return (
    <span
      className={cn(
        'relative inline-flex size-5 shrink-0 items-center justify-center',
        containerClassName
      )}
    >
      <input ref={ref} type="checkbox" className="peer sr-only" disabled={disabled} {...rest} />
      <span
        aria-hidden="true"
        className={cn(
          'border-border bg-secondary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 flex size-5 cursor-pointer items-center justify-center rounded border text-transparent transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          className
        )}
      >
        <Check className="size-3.5" />
      </span>
    </span>
  );
});

export { Checkbox };
