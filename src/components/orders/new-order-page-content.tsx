'use client';

import { useRouter } from 'next/navigation';
import { OrderForm } from '@/components/orders/order-form';

export function NewOrderPageContent() {
  const router = useRouter();

  function handleSuccess(id: string) {
    router.push(`/orders/${id}`);
  }

  return <OrderForm mode="create" onSuccess={handleSuccess} />;
}
