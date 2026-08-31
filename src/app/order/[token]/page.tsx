import { getPublicOrder } from '@/actions/get-public-order';
import { OrderHero } from '@/components/features/order/order-hero';
import { OrderItemsSection } from '@/components/features/order/order-items-section';
import { OrderStatusProgress } from '@/components/features/order/order-status-progress';
import { PaymentInfoSection } from '@/components/features/order/payment-info-section';
import { WorkTermsSection } from '@/components/features/order/work-terms-section';
import { AnimateIn } from '@/components/ui/feedback/animate-in';

type PublicOrderPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicOrderPage(props: PublicOrderPageProps) {
  const { params } = props;
  const { token } = await params;

  const order = await getPublicOrder(token);

  return (
    <AnimateIn className="space-y-6">
      <OrderHero order={order} />
      <OrderStatusProgress status={order.status} statusDates={order.statusDates} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-6">
          <OrderItemsSection items={order.items} />
          <WorkTermsSection order={order} />
        </div>
        <aside className="h-full">
          <PaymentInfoSection order={order} token={token} />
        </aside>
      </div>
    </AnimateIn>
  );
}
