'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormDateInput } from '@/components/ui/form/fields/form-date-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { Button } from '@/components/ui/actions/button';
import { CircleDollarSignIcon } from '@/components/icons/circle-dollar-sign';
import { PlusIcon } from '@/components/icons/plus';
import { addPayment } from '@/actions/payments';
import { PaymentSchema, type PaymentInput } from '@/schemas/payments';
import { useAsyncAction } from '@/hooks/use-async-action';

type PaymentFormDialogProps = {
  orderId: string;
};

const DEFAULT_VALUES: PaymentInput = {
  amount: '',
  paidAt: format(new Date(), 'yyyy-MM-dd'),
  note: '',
};

export function PaymentFormDialog(props: PaymentFormDialogProps) {
  const { orderId } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<PaymentInput>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const { control, handleSubmit, reset } = form;

  async function onSubmit(data: PaymentInput) {
    const { error } = await addPayment(orderId, data);
    if (error) throw new Error(error);
    toast.success('Оплата добавлена');
    reset(DEFAULT_VALUES);
    setOpen(false);
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  function handleOpenChange(value: boolean) {
    if (!value) reset(DEFAULT_VALUES);
    setOpen(value);
  }

  return (
    <>
      <Button Icon={PlusIcon} onClick={() => setOpen(true)} variant="outline" size="sm">
        Добавить оплату
      </Button>

      <AppDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Добавить оплату"
        Icon={CircleDollarSignIcon}
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(execute)} className="space-y-4">
            <FormInput control={control} name="amount" label="Сумма (₽)" type="number" />
            <FormDateInput control={control} name="paidAt" label="Дата оплаты" />
            <FormTextarea control={control} name="note" label="Заметка (необязательно)" rows={2} />
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading} Icon={CircleDollarSignIcon}>
                Сохранить
              </Button>
            </div>
          </form>
        </Form>
      </AppDialog>
    </>
  );
}
