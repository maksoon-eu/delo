'use client';

import type { ReactNode } from 'react';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { FileText, User, CalendarDays, CreditCard, List } from 'lucide-react';
import { Form } from '@/shared/components/ui/form/form';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { FormDateInput } from '@/shared/components/ui/form/fields/form-date-input';
import { FormSelect } from '@/shared/components/ui/form/fields/form-select';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { OrderItemFields } from './order-item-fields';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { PlusIcon } from '@/shared/components/icons/plus';
import type { OrderInput } from '@/shared/schemas/orders';
import type { SelectOption } from '@/shared/types/forms';
import { PAYMENT_METHOD_OPTIONS } from '@/shared/constants/payments';
import { OrderTotal } from './order-total';

type OrderFormProps = {
  mode: 'create' | 'edit';
  form: UseFormReturn<OrderInput>;
  fields: FieldArrayWithId<OrderInput, 'items'>[];
  clientField: ReactNode;
  defaultPaymentMethod?: SelectOption;
  canRemoveItems: boolean;
  isLoading: boolean;
  onSubmit: (data: OrderInput) => Promise<void>;
  onAppendItem: () => void;
  onRemoveItem: (index: number) => void;
};

export function OrderForm(props: OrderFormProps) {
  const {
    mode,
    form,
    fields,
    clientField,
    defaultPaymentMethod,
    canRemoveItems,
    isLoading,
    onSubmit,
    onAppendItem,
    onRemoveItem,
  } = props;
  const { control, handleSubmit } = form;

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard title="Заказ" Icon={FileText}>
          <div className="space-y-4">
            <FormInput control={control} name="title" label="Название заказа" />
            <FormTextarea
              control={control}
              name="description"
              label="Описание"
              placeholder="Опишите суть заказа..."
            />
          </div>
        </SectionCard>

        <SectionCard title="Клиент" Icon={User}>
          {clientField}
        </SectionCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard title="Время" Icon={CalendarDays}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormDateInput control={control} name="startDate" label="Дата начала" />
            <FormDateInput control={control} name="deadline" label="Дедлайн" />
          </div>
        </SectionCard>

        <SectionCard title="Оплата" Icon={CreditCard}>
          <FormSelect
            control={control}
            name="paymentMethod"
            label="Способ оплаты"
            options={PAYMENT_METHOD_OPTIONS}
            defaultOption={defaultPaymentMethod}
          />
        </SectionCard>
      </div>

      <SectionCard
        title="Состав работ"
        Icon={List}
        action={
          <Button
            type="button"
            mode="icon"
            variant="outline"
            tooltip="Добавить позицию"
            Icon={PlusIcon}
            onClick={onAppendItem}
          />
        }
      >
        <div className="space-y-3">
          <span className="text-muted-foreground text-xs">Позиции</span>
          <div className="sm:h-37.5 h-52 space-y-2 overflow-y-auto px-1">
            {fields.map((field, index) => (
              <OrderItemFields
                key={field.id}
                control={control}
                index={index}
                canRemove={canRemoveItems}
                onRemove={onRemoveItem}
              />
            ))}
          </div>
          <div className="border-border flex justify-end border-t pt-3">
            <OrderTotal control={control} />
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end pt-1">
        <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
          {mode === 'create' ? 'Создать заказ' : 'Сохранить изменения'}
        </Button>
      </div>
    </Form>
  );
}
