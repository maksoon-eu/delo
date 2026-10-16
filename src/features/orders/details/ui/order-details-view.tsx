import type { ReactNode } from 'react';
import { CircleDollarSign, History } from 'lucide-react';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import type { OrderDetailsSlots } from '../types';

type OrderDetailsViewProps = OrderDetailsSlots & {
  statusPanel: ReactNode;
  documentsSection: ReactNode;
  paymentDialog: ReactNode;
};

export function OrderDetailsView(props: OrderDetailsViewProps) {
  const {
    statusPanel,
    documentsSection,
    paymentDialog,
    information,
    workItems,
    payments,
    activity,
  } = props;

  return (
    <>
      {statusPanel}
      {documentsSection}
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {information}
        <SectionCard
          title="Оплата"
          Icon={CircleDollarSign}
          action={paymentDialog}
          className="h-88 flex min-h-0 flex-col overflow-hidden p-6"
        >
          {payments}
        </SectionCard>
        {workItems}
        <SectionCard
          title="История"
          Icon={History}
          className="flex h-80 min-h-0 flex-col overflow-hidden p-6"
        >
          {activity}
        </SectionCard>
      </div>
    </>
  );
}
