'use client';

import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { DatePicker } from '@/components/ui/form/primitives/date-picker';

type FormDateInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

export function FormDateInput<T extends FieldValues>(props: FormDateInputProps<T>) {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePicker {...field} value={field.value ?? ''} label={label} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
