'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import type { SelectOption } from '@/types';
import { SelectInput } from './select-input';

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  defaultOption?: SelectOption;
};

export function FormSelect<T extends FieldValues>(props: FormSelectProps<T>) {
  const { control, name, label, options, defaultOption } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <SelectInput
              value={defaultOption ?? null}
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
