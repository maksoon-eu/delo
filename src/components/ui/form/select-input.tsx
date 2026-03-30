'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';

type SelectOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  value: string;
  onValueChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
};

export function SelectInput(props: SelectInputProps) {
  const { value, onValueChange, options, placeholder, className } = props;

  const currentLabel = options.find((o) => o.value === value)?.label;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn('border-accent min-w-36 data-[size=default]:h-10 cursor-pointer', className)}>
        <SelectValue placeholder={placeholder}>{currentLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className="glass border-border/70 bg-popover/95 shadow-xl"
        alignItemWithTrigger={false}
      >
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer py-3 pl-4 pr-10">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
