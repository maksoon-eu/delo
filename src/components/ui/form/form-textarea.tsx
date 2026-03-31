'use client';

import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Textarea } from '@/components/ui/form/textarea';
import { cn } from '@/lib/utils';

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
} & Pick<ComponentProps<'textarea'>, 'rows'>;

export function FormTextarea<T extends FieldValues>(props: FormTextareaProps<T>) {
  const { control, name, label, rows } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <Textarea
                {...field}
                value={field.value ?? ''}
                placeholder=" "
                rows={rows}
                className="peer pt-6"
              />
            </FormControl>
            <FormLabel
              className={cn(
                'text-muted-foreground pointer-events-none absolute left-3 top-2.5 text-sm font-normal transition-[top,left,transform,padding,background-color,color,font-size] duration-200',
                'peer-focus:bg-card peer-focus:text-primary peer-focus:left-2.5 peer-focus:top-0 peer-focus:translate-y-[-50%] peer-focus:px-1 peer-focus:text-xs',
                'peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:text-muted-foreground peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:translate-y-[-50%] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs',
                'peer-[:focus:not(:placeholder-shown)]:text-primary'
              )}
            >
              {label}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
