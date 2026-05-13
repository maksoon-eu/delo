'use client';

import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/actions/button';
import { updateOrderStatus } from '@/actions/orders';
import { ORDER_STATUS_ACTION_LABELS } from '@/constants/orders';
import { useAsyncAction } from '@/hooks/use-async-action';
import type { AnimatedIconComponent } from '@/types/icons';
import { OrderStatus } from '@prisma/client';

type TransitionButtonProps = {
  orderId: string;
  targetStatus: OrderStatus;
  Icon?: AnimatedIconComponent;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
};

export function TransitionButton(props: TransitionButtonProps) {
  const { orderId, targetStatus, Icon, size, className } = props;
  const router = useRouter();

  async function handleTransition() {
    const { error } = await updateOrderStatus(orderId, targetStatus);
    if (error) throw new Error(error);
    toast.success(`Статус: ${ORDER_STATUS_ACTION_LABELS[targetStatus]}`);
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(handleTransition);

  return (
    <Button
      variant="outline"
      size={size}
      className={className}
      isLoading={isLoading}
      Icon={Icon}
      onClick={execute}
    >
      {ORDER_STATUS_ACTION_LABELS[targetStatus]}
    </Button>
  );
}
