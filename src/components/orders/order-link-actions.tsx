'use client';

import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { markOrderSentByLinkCopy } from '@/actions/orders';
import { CopyIcon } from '@/components/icons/copy';
import { Button } from '@/components/ui/actions/button';
import { useAsyncAction } from '@/hooks/use-async-action';
import { OrderStatus } from '@prisma/client';

type OrderLinkActionsProps = {
  orderId: string;
  publicOrderUrl: string;
  currentStatus: OrderStatus;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
};

export function OrderLinkActions(props: OrderLinkActionsProps) {
  const { orderId, publicOrderUrl, currentStatus, size, className } = props;
  const router = useRouter();
  const isDraft = currentStatus === OrderStatus.DRAFT;

  async function copyOrderLink() {
    await navigator.clipboard.writeText(publicOrderUrl);

    const { error } = await markOrderSentByLinkCopy(orderId);
    if (error) throw new Error(error);

    toast.success('Ссылка скопирована');
    router.refresh();
  }

  const [executeCopy, isCopying] = useAsyncAction(copyOrderLink);

  return (
    <Button
      variant="outline"
      size={size}
      className={className}
      Icon={CopyIcon}
      isLoading={isCopying}
      onClick={executeCopy}
    >
      {isDraft ? 'Скопировать и отправить' : 'Скопировать ссылку'}
    </Button>
  );
}
