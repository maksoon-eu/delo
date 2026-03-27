'use client';

import { useRef, useState } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { EyeIcon } from '@/components/icons/eye';
import { cn } from '@/lib/utils';

interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

type AnimatedIconComponent = React.ComponentType<{
  size?: number;
  ref?: React.Ref<AnimatedIconHandle>;
}>;

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  Icon?: AnimatedIconComponent;
};

export function FormInput<T extends FieldValues>(props: FormInputProps<T>) {
  const { control, name, label, type = 'text', Icon } = props;
  const iconRef = useRef<AnimatedIconHandle>(null);
  const eyeRef = useRef<AnimatedIconHandle>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const togglePassword = () => {
    eyeRef.current?.startAnimation();
    setShowPassword((v) => !v);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type={inputType}
                placeholder=" "
                className={cn('peer', Icon && 'pl-9', isPassword && 'pr-9')}
                onFocus={() => iconRef.current?.startAnimation()}
                onBlur={() => {
                  field.onBlur();
                  iconRef.current?.stopAnimation();
                }}
              />
            </FormControl>
            {Icon && (
              <div className="text-muted-foreground peer-focus:text-primary pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors">
                <Icon size={16} ref={iconRef} />
              </div>
            )}
            {isPassword && field.value?.length > 0 && (
              <button
                type="button"
                onClick={togglePassword}
                className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
              >
                <EyeIcon size={16} ref={eyeRef} />
              </button>
            )}
            <span
              className={cn(
                'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm transition-all duration-200',
                Icon ? 'left-9' : 'left-3',
                'peer-focus:bg-card peer-focus:text-primary peer-focus:left-2.5 peer-focus:top-0 peer-focus:scale-[0.82] peer-focus:px-1',
                'peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:text-muted-foreground peer-[:not(:placeholder-shown)]:left-2.5 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.82] peer-[:not(:placeholder-shown)]:px-1',
                'peer-[:focus:not(:placeholder-shown)]:text-primary'
              )}
            >
              {label}
            </span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
