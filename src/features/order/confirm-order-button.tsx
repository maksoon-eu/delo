'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/actions/button';
import { CircleCheckIcon } from '@/shared/components/icons/circle-check';
import { confirmOrderByClient } from '@/actions/orders';
import { useAsyncAction } from '@/shared/hooks/use-async-action';

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
    <Button className="w-full" Icon={CircleCheckIcon} isLoading={isLoading} onClick={execute}>
      Подтвердить условия
    </Button>
  );
}
