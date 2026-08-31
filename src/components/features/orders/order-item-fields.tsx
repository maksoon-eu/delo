'use client';

import type { Control } from 'react-hook-form';
import { DeleteIcon } from '@/components/icons/delete';
import { Button } from '@/components/ui/actions/button';
import { FormInput } from '@/components/ui/form/fields/form-input';
import type { OrderInput } from '@/schemas/orders';

type OrderItemFieldsProps = {
  control: Control<OrderInput>;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
};

export function OrderItemFields(props: OrderItemFieldsProps) {
  const { control, index, canRemove, onRemove } = props;

  function handleRemove() {
    if (!canRemove) return;
    onRemove(index);
  }

  return (
    <div className="border-border grid grid-cols-1 items-start gap-2 rounded-xl border p-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:border-0 lg:p-0 lg:pt-1.5">
      <FormInput control={control} name={`items.${index}.name`} label="Название" />
      <FormInput control={control} name={`items.${index}.description`} label="Описание" />
      <FormInput control={control} name={`items.${index}.price`} type="number" label="Стоимость" />
      <Button
        type="button"
        mode="icon"
        variant="ghost"
        tooltip="Удалить позицию"
        Icon={DeleteIcon}
        disabled={!canRemove}
        onClick={handleRemove}
        className="justify-self-end lg:mt-1.5"
      />
    </div>
  );
}
