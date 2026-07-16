import { Handshake } from 'lucide-react';
import { SectionCard } from '@/components/ui/data/section-card';
import type { PublicOrderData } from '@/types/public-orders';

type WorkTermsSectionProps = {
  order: PublicOrderData;
};

export function WorkTermsSection(props: WorkTermsSectionProps) {
  const { order } = props;
  const workTerms = order.executorWorkTerms?.trim();

  if (!workTerms) return null;

  return (
    <SectionCard title="Условия работы исполнителя" Icon={Handshake} className="p-5 sm:p-6">
      <div className="border-border border-t pt-4">
        <p className="text-foreground whitespace-pre-line wrap-break-word text-sm leading-6">
          {workTerms}
        </p>
      </div>
    </SectionCard>
  );
}
