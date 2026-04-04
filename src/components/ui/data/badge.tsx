import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';

const badgeVariants = cva(
  'group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-sm border border-transparent font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-9 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg]:size-4!',
        sm: 'h-5 gap-1 px-2 py-0.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg]:size-3!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type BadgeIconPosition = 'start' | 'end';

type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    Icon?: ComponentType<{ size?: number; className?: string }>;
    iconPosition?: BadgeIconPosition;
  };

function Badge(props: BadgeProps) {
  const {
    className,
    variant = 'default',
    size = 'default',
    render,
    Icon,
    iconPosition = 'start',
    children,
    ...rest
  } = props;

  const iconEl = Icon ? (
    <span
      data-icon={iconPosition === 'start' ? 'inline-start' : 'inline-end'}
      className="inline-flex shrink-0"
    >
      <Icon />
    </span>
  ) : null;

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size }), className),
        children: (
          <>
            {iconPosition === 'start' && iconEl}
            {children}
            {iconPosition === 'end' && iconEl}
          </>
        ),
      },
      rest
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
