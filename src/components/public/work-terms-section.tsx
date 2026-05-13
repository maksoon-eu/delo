import { Handshake } from 'lucide-react';
import { ContentCard } from '@/components/ui/data/content-card';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import type { PublicOrderData } from '@/types/public-orders';

type WorkTermsSectionProps = {
  order: PublicOrderData;
};

export function WorkTermsSection(props: WorkTermsSectionProps) {
  const { order } = props;
  const workTerms = order.executorWorkTerms?.trim();

  if (!workTerms) return null;

  return (
    <AnimateIn variant="slide-up">
      <ContentCard className="bg-card">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-foreground mt-1 flex items-center gap-2 text-base font-semibold">
            <Handshake className="size-4" />
            Условия работы исполнителя
          </h2>
        </div>

        <div className="border-border border-t py-3">
          <p className="text-foreground whitespace-pre-line break-words text-sm leading-relaxed">
            {workTerms}
          </p>
        </div>
      </ContentCard>
    </AnimateIn>
  );
}
