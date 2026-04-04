'use client';

import { ReactNode, UIEvent, useState } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { ChevronDown, Check, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/types';

type ComboboxProps = {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (value: string | null) => void;
  onInputChange?: (value: string) => void;
  onOpen?: () => void;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  placeholder?: string;
  label?: string;
  emptyMessage?: string;
  action?: ReactNode;
  className?: string;
};

export function Combobox(props: ComboboxProps) {
  const {
    options,
    value,
    onChange,
    onInputChange,
    onOpen,
    onEndReached,
    isLoadingMore,
    placeholder,
    label,
    emptyMessage = 'Ничего не найдено',
    action,
    className,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(value);
  const isFloating = isFocused || !!value;

  function handleValueChange(newValue: string | null) {
    onChange(newValue ?? null);
  }

  function handleListScroll(e: UIEvent<HTMLElement>) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      onEndReached?.();
    }
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleOpen(open: boolean) {
    if (open) {
      onOpen?.();
    }
  }

  return (
    <div className="relative">
      <ComboboxPrimitive.Root
        value={selectedOption?.value ?? null}
        itemToStringLabel={() => selectedOption?.label || ''}
        onValueChange={handleValueChange}
        onOpenChange={handleOpen}
      >
        <ComboboxPrimitive.Trigger
          className={cn(
            'border-accent bg-accent/30 hover:border-ring hover:ring-ring/50 cursor-pointer',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            'h-10 w-full rounded-lg border text-sm transition-colors'
          )}
        >
          <ComboboxPrimitive.InputGroup className="flex w-full items-center px-3">
            <ComboboxPrimitive.Input
              placeholder={label ? ' ' : placeholder}
              className="placeholder:text-muted-foreground min-w-0 flex-1 cursor-pointer bg-transparent outline-none"
              onChange={(e) => onInputChange?.(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div className="text-muted-foreground ml-1 cursor-pointer">
              <ChevronDown className="size-4" />
            </div>
          </ComboboxPrimitive.InputGroup>
        </ComboboxPrimitive.Trigger>

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner sideOffset={20} className="isolate z-50">
            <ComboboxPrimitive.Popup
              className={cn(
                'bg-card border-border/70 text-popover-foreground shadow-xl',
                'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
                'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
                'w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg border duration-100'
              )}
            >
              {action && <div className="border-b p-1">{action}</div>}

              <ComboboxPrimitive.List
                className={cn('max-h-60 overflow-y-auto', className)}
                onScroll={handleListScroll}
              >
                {options.map((option) => (
                  <ComboboxPrimitive.Item
                    key={option.value}
                    value={option.value}
                    onClick={() => setSelectedOption(option)}
                    className={cn(
                      'data-highlighted:bg-accent/40 data-highlighted:text-foreground aria-selected:bg-accent/40 aria-selected:text-foreground',
                      'relative flex w-full cursor-pointer select-none items-center gap-2.5',
                      'not-last-of-type:border-b p-3 text-sm outline-none transition-colors',
                      'data-disabled:pointer-events-none data-disabled:opacity-50'
                    )}
                  >
                    <ComboboxPrimitive.ItemIndicator>
                      <Check className="text-primary size-3" />
                    </ComboboxPrimitive.ItemIndicator>
                    {option.label}
                  </ComboboxPrimitive.Item>
                ))}

                {options.length === 0 && !isLoadingMore && (
                  <div className="text-muted-foreground py-6 text-center text-sm">
                    {emptyMessage}
                  </div>
                )}

                {isLoadingMore && (
                  <div className="flex justify-center py-2">
                    <LoaderCircle size={16} className="text-muted-foreground animate-spin" />
                  </div>
                )}
              </ComboboxPrimitive.List>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>

      {label && (
        <span
          className={cn(
            'text-muted-foreground pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-normal transition-[top,left,transform,padding,background-color,color] duration-200',
            isFloating ? 'bg-card text-primary left-2.5 top-0 scale-[0.82] px-1' : 'left-3'
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
