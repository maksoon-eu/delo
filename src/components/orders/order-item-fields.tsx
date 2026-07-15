'use client';

import type { Control } from 'react-hook-form';
import { XIcon } from '@/components/icons/x';
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
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-start gap-2 pt-1.5">
      <FormInput control={control} name={`items.${index}.name`} label="Название" />
      <FormInput control={control} name={`items.${index}.description`} label="Описание" />
      <FormInput control={control} name={`items.${index}.price`} type="number" label="Стоимость" />
      <Button
        type="button"
        mode="icon"
        variant="ghost"
        tooltip="Удалить позицию"
        Icon={XIcon}
        disabled={!canRemove}
        onClick={handleRemove}
        className="mt-0.5"
      />
    </div>
  );
}
