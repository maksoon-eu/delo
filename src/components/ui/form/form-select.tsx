'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { SelectOption } from '@/types';
import { SelectInput } from './select-input';

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
};

export function FormSelect<T extends FieldValues>(props: FormSelectProps<T>) {
  const { control, name, label, options } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <SelectInput
              value={field.value}
              onValueChange={field.onChange}
              options={options}
              className="w-full"
              label={label}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
