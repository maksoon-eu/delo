import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { cn } from '@/shared/utils/cn';

type LandingCtaProps = {
  children: ReactNode;
  href: Route;
  className?: string;
};

export function LandingCta(props: LandingCtaProps) {
  const { children, href, className } = props;

  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      Icon={ArrowRightIcon}
      className={cn(
        'h-12 gap-3 rounded-lg px-6 text-sm font-medium motion-reduce:transform-none motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </Button>
  );
}
