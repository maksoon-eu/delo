'use client';

import { useRef } from 'react';
import { cn, formatDate, startAnimatedIcon, stopAnimatedIcon } from '@/lib/utils';
import { ORDER_STATUS_LABELS, ORDER_STATUS_ICONS } from '@/constants';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import type { AnimatedIconHandle } from '@/types';
import type { OrderStatus } from '@prisma/client';

const PROGRESS_STATUSES: OrderStatus[] = ['DRAFT', 'SENT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'];

type OrderStatusProgressProps = {
  status: OrderStatus;
  statusDates: Partial<Record<string, Date>>;
};

export function OrderStatusProgress(props: OrderStatusProgressProps) {
  const { status, statusDates } = props;

  const refs = [
    useRef<AnimatedIconHandle | null>(null),
    useRef<AnimatedIconHandle | null>(null),
    useRef<AnimatedIconHandle | null>(null),
    useRef<AnimatedIconHandle | null>(null),
    useRef<AnimatedIconHandle | null>(null),
  ];

  if (status === 'CANCELLED') return null;

  const currentIndex = PROGRESS_STATUSES.indexOf(status);

  return (
    <AnimateIn variant="slide-up">
      <div className="flex items-start gap-0">
        {PROGRESS_STATUSES.map((s, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;
          const Icon = ORDER_STATUS_ICONS[s];
          const ref = refs[i];
          const isLast = i === PROGRESS_STATUSES.length - 1;

          return (
            <div key={s} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    'h-0.5 flex-1 transition-colors',
                    i === 0 && 'invisible',
                    isPast || isCurrent ? 'bg-primary/60' : 'bg-border'
                  )}
                />
                <div
                  className={cn(
                    'flex size-8 shrink-0 cursor-default items-center justify-center rounded-full border-2 transition-colors',
                    isCurrent && 'border-primary bg-primary text-primary-foreground',
                    isPast && 'border-primary/40 bg-primary/10 text-primary/60',
                    isFuture && 'border-border bg-background text-muted-foreground/40'
                  )}
                  onMouseEnter={() => startAnimatedIcon(ref)}
                  onMouseLeave={() => stopAnimatedIcon(ref)}
                >
                  <Icon ref={ref} size={14} />
                </div>
                <div
                  className={cn(
                    'h-0.5 flex-1 transition-colors',
                    isLast && 'invisible',
                    isPast ? 'bg-primary/60' : 'bg-border'
                  )}
                />
              </div>
              <div className="mt-1.5 flex flex-col items-center gap-0.5">
                <span
                  className={cn(
                    'text-center text-[11px] font-medium leading-tight',
                    isCurrent && 'text-primary',
                    isPast && 'text-muted-foreground/60',
                    isFuture && 'text-muted-foreground/30'
                  )}
                >
                  {ORDER_STATUS_LABELS[s]}
                </span>
                {statusDates[s] && (
                  <span
                    className={cn(
                      'text-center text-[10px] font-bold leading-tight',
                      isCurrent && 'text-primary/70',
                      isPast && 'text-muted-foreground/40',
                      isFuture && 'hidden'
                    )}
                  >
                    {formatDate(statusDates[s]!, 'd MMM')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AnimateIn>
  );
}
