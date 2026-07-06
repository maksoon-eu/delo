'use client';

import { useState, type ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { Input } from '@/components/ui/form/primitives/input';
import { EyeIcon } from '@/components/icons/eye';
import { cn } from '@/utils/cn';

type AuthFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: ComponentProps<'input'>['autoComplete'];
  Icon?: LucideIcon;
};

export function AuthFormInput<T extends FieldValues>(props: AuthFormInputProps<T>) {
  const { control, name, label, placeholder, type = 'text', autoComplete, Icon } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputStep = type === 'number' ? 1 : undefined;
  const passwordToggleTooltip = showPassword ? 'Скрыть пароль' : 'Показать пароль';

  function togglePassword() {
    setShowPassword((value) => !value);
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel className="text-muted-foreground text-xs font-semibold">{label}</FormLabel>
          <div className="relative">
            {Icon && (
              <Icon
                size={16}
                className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                aria-hidden
              />
            )}
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                type={inputType}
                step={inputStep}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={cn(
                  'border-border bg-secondary/70 text-foreground placeholder:text-muted-foreground hover:border-ring focus-visible:border-ring h-12 rounded-lg text-sm shadow-none',
                  Icon && 'pl-11',
                  isPassword && 'pr-11'
                )}
              />
            </FormControl>
            {isPassword && field.value?.length > 0 && (
              <Button
                type="button"
                Icon={EyeIcon}
                mode="icon"
                variant="ghost"
                tooltip={passwordToggleTooltip}
                onClick={togglePassword}
                className="text-muted-foreground hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
