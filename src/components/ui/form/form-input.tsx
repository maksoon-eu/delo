'use client';

import { useRef, useState } from 'react';
import { ComponentProps } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { Input } from '@/components/ui/form/input';
import { EyeIcon } from '@/components/icons/eye';
import type { AnimatedIconComponent, AnimatedIconHandle } from '@/types';
import { cn, startAnimatedIcon, stopAnimatedIcon } from '@/lib/utils';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  autoComplete?: ComponentProps<'input'>['autoComplete'];
  Icon?: AnimatedIconComponent;
};

export function FormInput<T extends FieldValues>(props: FormInputProps<T>) {
  const { control, name, label, type = 'text', autoComplete, Icon } = props;
  const iconRef = useRef<AnimatedIconHandle>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const togglePassword = () => {
    setShowPassword((v) => !v);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const passwordToggleTooltip = showPassword ? 'Скрыть пароль' : 'Показать пароль';

        function handleInputFocus() {
          startAnimatedIcon(iconRef);
        }

        function handleInputBlur() {
          field.onBlur();
          stopAnimatedIcon(iconRef);
        }

        return (
          <FormItem>
            <div className="relative">
              <FormControl>
                <Input
                  {...field}
                  type={inputType}
                  autoComplete={autoComplete}
                  placeholder=" "
                  className={cn('peer', Icon && 'pl-9', isPassword && 'pr-10')}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </FormControl>
              {Icon && (
                <div className="text-muted-foreground peer-focus:text-primary pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors">
                  <Icon size={16} ref={iconRef} />
                </div>
              )}
              {isPassword && field.value?.length > 0 && (
                <Button
                  type="button"
                  Icon={EyeIcon}
                  mode="icon"
                  variant="ghost"
                  tooltip={passwordToggleTooltip}
                  onClick={togglePassword}
                  className="text-muted-foreground hover:text-foreground absolute right-1 top-1/2 -translate-y-1/2"
                />
              )}
              <FormLabel
                className={cn(
                  'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
                  Icon ? 'left-9' : 'left-3',
                  'peer-focus:bg-card peer-focus:text-primary peer-focus:left-2.5 peer-focus:top-0 peer-focus:scale-[0.82] peer-focus:px-1',
                  'peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:text-muted-foreground peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.82] peer-[:not(:placeholder-shown)]:px-1',
                  'peer-[:focus:not(:placeholder-shown)]:text-primary'
                )}
              >
                {label}
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
