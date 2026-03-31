'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form/select';
import { SelectOption } from '@/types';

type SelectInputProps = {
  value: SelectOption | null;
  onValueChange: (value: SelectOption | null) => void;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  className?: string;
};

export function SelectInput(props: SelectInputProps) {
  const { value, onValueChange, options, placeholder, className, label } = props;
  const effectiveValue = value ?? options[0];

  return (
    <Select value={effectiveValue} onValueChange={onValueChange}>
      <div className="relative">
        <SelectTrigger
          className={cn(
            'border-accent min-w-36 cursor-pointer data-[size=default]:h-10',
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className="glass border-border/70 bg-popover/95 shadow-xl"
          alignItemWithTrigger={false}
          sideOffset={10}
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
        <span
          className={cn(
            'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
            effectiveValue ? 'bg-card left-2.5 top-0 scale-[0.82] px-1' : 'left-3',
            'peer-data-popup-open:bg-card peer-data-popup-open:text-primary peer-data-popup-open:left-2.5 peer-data-popup-open:top-0 peer-data-peer-data-popup-open:scale-[0.82] peer-data-popup-open:px-1'
          )}
        >
          {label}
        </span>
      </div>
    </Select>
  );
}
