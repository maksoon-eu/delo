'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { FormTextarea } from '@/components/ui/form/form-textarea';
import { FormDateInput } from '@/components/ui/form/form-date-input';
import { FormSelect } from '@/components/ui/form/form-select';
import { FormClientCombobox } from '@/components/orders/form-client-combobox';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { PlusIcon } from '@/components/icons/plus';
import { XIcon } from '@/components/icons/x';
import { FileTextIcon } from '@/components/icons/file-text';
import { CircleDollarSignIcon } from '@/components/icons/circle-dollar-sign';
import { OrderSchema, type OrderInput } from '@/schemas/orders';
import { createOrder, updateOrder } from '@/actions/orders';
import { useAsyncAction } from '@/hooks/use-async-action';
import { CURRENCY_OPTIONS } from '@/constants';
import { ORDER_CREATE_DEFAULT_VALUES, ORDER_ITEM_DEFAULT } from './constants';
import { OrderTotal } from './order-total';

type ClientOption = { id: string; name: string };

type OrderFormProps =
  | { mode: 'create'; onSuccess?: (id: string) => void }
  | {
      mode: 'edit';
      orderId: string;
      defaultClient: ClientOption;
      defaultValues: OrderInput;
      onSuccess?: () => void;
    };

export function OrderForm(props: OrderFormProps) {
  const { mode } = props;
  const defaultClient = props.mode === 'edit' ? props.defaultClient : undefined;

  const form = useForm<OrderInput>({
    resolver: zodResolver(OrderSchema),
    defaultValues: props.mode === 'edit' ? props.defaultValues : ORDER_CREATE_DEFAULT_VALUES,
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  async function onSubmit(data: OrderInput) {
    if (props.mode === 'create') {
      const result = await createOrder(data);
      if ('error' in result) throw new Error(result.error);
      toast.success('Заказ создан');
      props.onSuccess?.(result.id);
    } else {
      const { error } = await updateOrder(props.orderId, data);
      if (error) throw new Error(error);
      toast.success('Заказ обновлён');
      props.onSuccess?.();
    }
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  function handleAppendItem() {
    append(ORDER_ITEM_DEFAULT);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(execute)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormClientCombobox control={control} defaultClient={defaultClient} />
          <FormInput control={control} name="title" label="Заголовок заказа" Icon={FileTextIcon} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormDateInput control={control} name="startDate" label="Дата начала" />
          <FormDateInput control={control} name="deadline" label="Дедлайн" />
        </div>

        <FormTextarea
          control={control}
          name="description"
          label="Описание"
          placeholder="Опишите суть заказа..."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput
            control={control}
            name="price"
            label="Стоимость"
            type="number"
            Icon={CircleDollarSignIcon}
          />
          <FormSelect control={control} name="currency" label="Валюта" options={CURRENCY_OPTIONS} />
        </div>

        <FormTextarea
          control={control}
          name="paymentDetails"
          label="Реквизиты оплаты"
          placeholder="Номер карты, расчётный счёт и т.д."
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Состав работ</span>
            <OrderTotal control={control} />
          </div>

          {fields.length > 0 && (
            <div className="space-y-2">
              <div className="text-muted-foreground grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-2 px-1 text-xs">
                <span>Название</span>
                <span>Описание</span>
                <span>Кол-во</span>
                <span>Ед.</span>
                <span>Цена</span>
                <span />
              </div>

              {fields.map((field, index) => {
                function handleRemove() {
                  remove(index);
                }

                return (
                  <div
                    key={field.id}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] items-start gap-2"
                  >
                    <FormInput
                      control={control}
                      name={`items.${index}.name`}
                      placeholder="Название"
                    />
                    <FormInput
                      control={control}
                      name={`items.${index}.description`}
                      placeholder="Описание"
                    />
                    <FormInput
                      control={control}
                      name={`items.${index}.quantity`}
                      type="number"
                      placeholder="1"
                    />
                    <FormInput control={control} name={`items.${index}.unit`} placeholder="шт" />
                    <FormInput
                      control={control}
                      name={`items.${index}.price`}
                      type="number"
                      placeholder="0"
                    />
                    <Button
                      type="button"
                      mode="icon"
                      variant="ghost"
                      tooltip="Удалить позицию"
                      Icon={XIcon}
                      onClick={handleRemove}
                      className="mt-0.5"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            Icon={PlusIcon}
            onClick={handleAppendItem}
          >
            Добавить позицию
          </Button>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
            {mode === 'create' ? 'Создать заказ' : 'Сохранить изменения'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
