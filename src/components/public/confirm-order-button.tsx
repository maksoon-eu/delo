'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/actions/button';
import { CircleCheckIcon } from '@/components/icons/circle-check';
import { confirmOrderByClient } from '@/actions/orders';
import { useAsyncAction } from '@/hooks/use-async-action';

type ConfirmOrderButtonProps = {
  token: string;
};

export function ConfirmOrderButton(props: ConfirmOrderButtonProps) {
  const { token } = props;
  const router = useRouter();

  async function handleConfirm() {
    const { error } = await confirmOrderByClient(token);
    if (error) throw new Error(error);
    toast.success('Условия подтверждены');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(handleConfirm);

  return (
    <Button Icon={CircleCheckIcon} isLoading={isLoading} onClick={execute}>
      Подтвердить условия
    </Button>
  );
}
