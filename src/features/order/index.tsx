'use client';

import type { PublicOrderSlots } from './common/types';
import type { PublicOrderSummary } from './payment-info/types';
import { PublicOrderView } from './common/ui/public-order-view';
import { PublicOrderPaymentInfo } from './payment-info';

type PublicOrderFeatureProps = PublicOrderSlots & { order: PublicOrderSummary; token: string };

export function PublicOrderFeature(props: PublicOrderFeatureProps) {
  const { order, token, payments, ...slots } = props;

  return (
    <PublicOrderView
      {...slots}
      paymentInfo={<PublicOrderPaymentInfo order={order} token={token} payments={payments} />}
    />
  );
}
