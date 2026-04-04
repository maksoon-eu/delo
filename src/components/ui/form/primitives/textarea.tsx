import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

function Textarea(props: ComponentProps<'textarea'>) {
  const { className, ...rest } = props;

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-accent bg-accent/30 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:border-ring hover:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex min-h-16 w-full rounded-lg border px-3 py-2.5 text-base outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...rest}
    />
  );
}

export { Textarea };
