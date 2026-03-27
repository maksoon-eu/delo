'use client';

import { useRef } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import type { ComponentType, Ref } from 'react';
import type { AnimatedIconHandle } from '@/types';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:scale-[1.02] active:scale-[0.97] active:translate-y-px cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-accent bg-accent/30 hover:bg-accent/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          "h-9 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type AnimatedIconComponent = ComponentType<{
  size?: number;
  ref?: Ref<AnimatedIconHandle>;
}>;

type ButtonMode = 'icon' | 'default';

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    Icon?: AnimatedIconComponent;
    tooltip?: string;
    mode?: ButtonMode;
  };

export function Button(props: ButtonProps) {
  const { className, variant, size, isLoading, Icon, children, disabled, tooltip, mode, ...rest } =
    props;
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (!isLoading) iconRef.current?.startAnimation();
  };
  const handleMouseLeave = () => {
    if (!isLoading) iconRef.current?.stopAnimation();
  };

  return (
    <ButtonPrimitive
      data-slot="button"
      {...rest}
      className={cn(buttonVariants({ variant, size: mode === 'icon' ? 'icon' : size, className }))}
      title={tooltip}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        Icon && <Icon size={18} ref={iconRef} />
      )}
      {children}
    </ButtonPrimitive>
  );
}
