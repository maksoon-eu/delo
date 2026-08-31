import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { cn } from '@/utils/cn';

type LandingCtaProps = {
  children: ReactNode;
  href?: Route;
  variant?: 'solid' | 'ghost';
  className?: string;
  disabledReason?: string;
};

export function LandingCta(props: LandingCtaProps) {
  const { children, href, variant = 'solid', className, disabledReason } = props;
  const sharedClassName = cn(
    'h-12 rounded-full px-7 text-[15px] font-bold motion-reduce:hover:scale-100 motion-reduce:active:translate-y-0 motion-reduce:active:scale-100 motion-reduce:transition-none',
    variant === 'solid'
      ? 'shadow-lg shadow-primary/20'
      : 'border-border bg-card/30 text-foreground hover:bg-card/70',
    className
  );

  if (href) {
    return (
      <Button
        render={<Link href={href} />}
        nativeButton={false}
        variant={variant === 'solid' ? 'default' : 'outline'}
        className={sharedClassName}
      >
        {children}
        <ArrowRightIcon
          size={18}
          className="transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0"
        />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant === 'solid' ? 'default' : 'outline'}
      className={sharedClassName}
      disabled
      tooltip={disabledReason}
    >
      {children}
      <ArrowRightIcon
        size={18}
        className="transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0"
      />
    </Button>
  );
}
