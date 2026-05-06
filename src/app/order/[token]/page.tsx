import { getPublicOrder } from '@/actions/get-public-order';
import { OrderHero } from '@/components/public/order-hero';
import { OrderItemsSection } from '@/components/public/order-items-section';
import { OrderStatusProgress } from '@/components/public/order-status-progress';
import { PaymentInfoSection } from '@/components/public/payment-info-section';
import { ConfirmOrderButton } from '@/components/public/confirm-order-button';
import { ContentCard } from '@/components/ui/data/content-card';

type PublicOrderPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicOrderPage(props: PublicOrderPageProps) {
  const { params } = props;
  const { token } = await params;

  const order = await getPublicOrder(token);

  return (
    <ContentCard className="space-y-6">
      <OrderHero order={order} />
      <OrderStatusProgress status={order.status} statusDates={order.statusDates} />
      <OrderItemsSection items={order.items} />
      <PaymentInfoSection order={order} />
      {order.status === 'SENT' && (
        <div className="flex justify-center">
          <ConfirmOrderButton token={token} />
        </div>
      )}
    </ContentCard>
  );
}
