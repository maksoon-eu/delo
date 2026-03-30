'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/actions/button';
import { updateOrderStatus } from '@/actions/orders';
import { ORDER_STATUS_LABELS } from '@/constants';
import { useAsyncAction } from '@/hooks/use-async-action';
import { OrderStatus } from '@prisma/client';

type TransitionButtonProps = {
  orderId: string;
  targetStatus: OrderStatus;
};

export function TransitionButton(props: TransitionButtonProps) {
  const { orderId, targetStatus } = props;
  const router = useRouter();

  async function handleTransition() {
    const { error } = await updateOrderStatus(orderId, targetStatus);
    if (error) throw new Error(error);
    toast.success(`Статус: ${ORDER_STATUS_LABELS[targetStatus]}`);
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(handleTransition);

  return (
    <Button variant="outline" size="sm" isLoading={isLoading} onClick={execute}>
      {ORDER_STATUS_LABELS[targetStatus]}
    </Button>
  );
}
