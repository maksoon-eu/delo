'use client';

import type { ComponentProps } from 'react';
import { toast } from 'sonner';
import { CopyIcon } from '@/components/icons/copy';
import { Button } from '@/components/ui/actions/button';
import { useAsyncAction } from '@/hooks/use-async-action';

type OrderLinkActionsProps = {
  publicOrderUrl: string;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
};

export function OrderLinkActions(props: OrderLinkActionsProps) {
  const { publicOrderUrl, size, className } = props;

  async function copyOrderLink() {
    await navigator.clipboard.writeText(publicOrderUrl);
    toast.success('Ссылка скопирована');
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
      Скопировать ссылку
    </Button>
  );
}
