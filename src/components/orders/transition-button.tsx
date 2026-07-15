'use client';

import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/actions/button';
import { useConfirmation } from '@/components/providers/confirmation/confirmation.hook';
import { updateOrderStatus } from '@/actions/orders';
import { ORDER_STATUS_ACTION_LABELS, ORDER_STATUS_LABELS } from '@/constants/orders';
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
  const confirm = useConfirmation();
  const isDestructive = targetStatus === OrderStatus.CANCELLED;
  const actionLabel = ORDER_STATUS_ACTION_LABELS[targetStatus];
  const statusLabel = ORDER_STATUS_LABELS[targetStatus];

  async function handleTransition() {
    const { error } = await updateOrderStatus(orderId, targetStatus);
    if (error) throw new Error(error);
    toast.success(`Статус: ${actionLabel}`);
    router.refresh();
  }

  function handleOpenConfirmation() {
    confirm({
      title: 'Вы уверены?',
      description: `Статус заказа будет переведён в «${statusLabel}».`,
      confirmLabel: actionLabel,
      Icon,
      destructive: isDestructive,
      action: handleTransition,
    });
  }

  return (
    <Button
      variant={isDestructive ? 'destructive' : 'outline'}
      size={size}
      className={className}
      Icon={Icon}
      onClick={handleOpenConfirmation}
    >
      {actionLabel}
    </Button>
  );
}
