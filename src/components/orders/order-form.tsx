'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { FileText, User, CalendarDays, CreditCard, List } from 'lucide-react';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { FormDateInput } from '@/components/ui/form/fields/form-date-input';
import { FormSelect } from '@/components/ui/form/fields/form-select';
import { FormClientCombobox } from '@/components/orders/form-client-combobox';
import { FormSection } from '@/components/orders/form-section';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { PlusIcon } from '@/components/icons/plus';
import { XIcon } from '@/components/icons/x';
import { CircleDollarSignIcon } from '@/components/icons/circle-dollar-sign';
import { OrderSchema, type OrderInput } from '@/schemas/orders';
import { createOrder, updateOrder } from '@/actions/orders';
import { useAsyncAction } from '@/hooks/use-async-action';
import { PAYMENT_METHOD_OPTIONS } from '@/constants';
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
      <form onSubmit={handleSubmit(execute)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormSection title="Заказ" Icon={FileText}>
            <div className="space-y-4">
              <FormInput control={control} name="title" label="Название заказа" />
              <FormTextarea
                control={control}
                name="description"
                label="Описание"
                placeholder="Опишите суть заказа..."
              />
            </div>
          </FormSection>

          <FormSection title="Клиент" Icon={User}>
            <FormClientCombobox control={control} defaultClient={defaultClient} />
          </FormSection>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormSection title="Время" Icon={CalendarDays}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormDateInput control={control} name="startDate" label="Дата начала" />
              <FormDateInput control={control} name="deadline" label="Дедлайн" />
            </div>
          </FormSection>

          <FormSection title="Оплата" Icon={CreditCard}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                control={control}
                name="price"
                label="Стоимость"
                type="number"
                Icon={CircleDollarSignIcon}
              />
              <FormSelect
                control={control}
                name="paymentMethod"
                label="Способ оплаты"
                options={PAYMENT_METHOD_OPTIONS}
              />
            </div>
          </FormSection>
        </div>

        <FormSection title="Состав работ" Icon={List}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Позиции</span>
              <OrderTotal control={control} />
            </div>
            <div className="h-37.5 space-y-2 overflow-auto">
              {fields.length > 0 && (
                <>
                  <div className="text-muted-foreground grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-1 text-xs">
                    <span>Название</span>
                    <span>Описание</span>
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
                        className="grid grid-cols-[1fr_1fr_1fr_auto] items-start gap-2"
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
                </>
              )}
            </div>

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
        </FormSection>

        <div className="flex justify-end pt-1">
          <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
            {mode === 'create' ? 'Создать заказ' : 'Сохранить изменения'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
