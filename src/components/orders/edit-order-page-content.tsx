'use client';

import { useRouter } from 'next/navigation';
import { OrderForm } from '@/components/orders/order-form';
import type { OrderInput } from '@/schemas/orders';

type EditOrderPageContentProps = {
  orderId: string;
  defaultClient: { id: string; name: string };
  defaultValues: OrderInput;
};

export function EditOrderPageContent(props: EditOrderPageContentProps) {
  const { orderId, defaultClient, defaultValues } = props;
  const router = useRouter();

  function handleSuccess() {
    router.push(`/orders/${orderId}`);
  }

  return (
    <OrderForm
      mode="edit"
      orderId={orderId}
      defaultClient={defaultClient}
      defaultValues={defaultValues}
      onSuccess={handleSuccess}
    />
  );
}
