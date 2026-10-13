'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createOrder, updateOrder, searchClients } from '@/actions/orders';
import { ClientForm } from '@/features/clients/editor';
import { useRequireVerifiedEmail } from '@/shared/components/providers/email-verification/email-verification.hook';
import type { FormComboboxLoadOptionsParams } from '@/shared/components/ui/form/fields/form-combobox';
import type { SelectOption } from '@/shared/types/forms';
import { OrderSchema, type OrderInput } from '@/shared/schemas/orders';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { PAYMENT_METHOD_OPTIONS_MAP } from '@/shared/constants/payments';
import { ORDER_CREATE_DEFAULT_VALUES, ORDER_ITEM_DEFAULT } from './constants';
import type { OrderEditorOptions } from './types';
import { OrderForm } from './ui/order-form';
import { FormClientCombobox } from './ui/form-client-combobox';

type OrderEditorProps = OrderEditorOptions;

export function OrderEditor(props: OrderEditorProps) {
  const options = props;
  const router = useRouter();
  const defaultClient = options.mode === 'edit' ? options.defaultClient : undefined;
  const defaultPaymentMethod =
    options.mode === 'edit'
      ? PAYMENT_METHOD_OPTIONS_MAP[options.defaultValues.paymentMethod ?? '']
      : undefined;
  const form = useForm<OrderInput>({
    resolver: zodResolver(OrderSchema),
    defaultValues: options.mode === 'edit' ? options.defaultValues : ORDER_CREATE_DEFAULT_VALUES,
  });
  const { control } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const [createOpen, setCreateOpen] = useState(false);
  const [createdOption, setCreatedOption] = useState<SelectOption | undefined>();
  const requireVerifiedEmail = useRequireVerifiedEmail();
  const defaultOption = defaultClient
    ? { value: defaultClient.id, label: defaultClient.name }
    : undefined;
  const defaultOptions = defaultOption ? [defaultOption] : [];

  async function loadOptions(params: FormComboboxLoadOptionsParams) {
    const { query, offset, take } = params;
    const results = await searchClients({ query, offset, take });
    return results.map((client) => ({ value: client.id, label: client.name }));
  }

  function openCreate() {
    if (!requireVerifiedEmail()) return;
    setCreateOpen(true);
  }

  function completeCreate(id: string, name: string) {
    setCreatedOption({ value: id, label: name });
    setCreateOpen(false);
  }

  async function saveOrder(data: OrderInput) {
    if (options.mode === 'create') {
      const result = await createOrder(data);
      if ('error' in result) throw new Error(result.error);
      toast.success('Заказ создан');
      options.onSuccess?.(result.id);
    } else {
      const { error } = await updateOrder(options.orderId, data);
      if (error) throw new Error(error);
      toast.success('Заказ обновлён');

      if (options.onSuccess) {
        options.onSuccess();
      } else {
        router.push(`/orders/${options.orderId}`);
      }
    }
  }

  const [submit, isLoading] = useAsyncAction(saveOrder);

  function appendItem() {
    append(ORDER_ITEM_DEFAULT);
  }

  return (
    <OrderForm
      mode={props.mode}
      form={form}
      fields={fields}
      defaultPaymentMethod={defaultPaymentMethod}
      canRemoveItems={fields.length > 1}
      isLoading={isLoading}
      onSubmit={submit}
      onAppendItem={appendItem}
      onRemoveItem={remove}
      clientField={
        <FormClientCombobox
          control={control}
          createOpen={createOpen}
          createdOption={createdOption}
          defaultOption={defaultOption}
          defaultOptions={defaultOptions}
          onLoadOptions={loadOptions}
          onOpenCreate={openCreate}
          onCreateOpenChange={setCreateOpen}
          createForm={<ClientForm mode="create" onSuccess={completeCreate} />}
        />
      }
    />
  );
}
