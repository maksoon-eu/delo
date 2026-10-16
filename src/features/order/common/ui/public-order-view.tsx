import type { ReactNode } from 'react';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import type { PublicOrderSlots } from '../types';

type PublicOrderViewProps = Omit<PublicOrderSlots, 'payments'> & { paymentInfo: ReactNode };

export function PublicOrderView(props: PublicOrderViewProps) {
  const { hero, statusProgress, workItems, workTerms, paymentInfo } = props;

  return (
    <AnimateIn className="space-y-6">
      {hero}
      {statusProgress}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-6">
          {workItems}
          {workTerms}
        </div>
        <aside className="h-full">{paymentInfo}</aside>
      </div>
    </AnimateIn>
  );
}
