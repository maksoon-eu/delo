'use client';

import { ReactNode, UIEvent } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { ChevronDown, Check, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (value: string) => void;
  onOpen?: () => void;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  footer?: ReactNode;
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
    emptyMessage = 'Ничего не найдено',
    footer,
  } = props;

  function handleValueChange(newValue: string | null) {
    onChange(newValue ?? '');
  }

  function handleListScroll(e: UIEvent<HTMLElement>) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      onEndReached?.();
    }
  }

  return (
    <ComboboxPrimitive.Root
      value={value || null}
      onValueChange={handleValueChange}
      itemToStringLabel={(v) => options.find((o) => o.value === v)?.label ?? ''}
    >
      <ComboboxPrimitive.InputGroup
        className={cn(
          'border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          'flex h-8 w-full items-center rounded-lg border bg-transparent px-2.5 text-sm transition-colors'
        )}
      >
        <ComboboxPrimitive.Input
          placeholder={placeholder}
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent outline-none"
          onFocus={onOpen}
          onChange={(e) => onInputChange?.(e.target.value)}
        />
        <ComboboxPrimitive.Trigger className="text-muted-foreground ml-1 cursor-pointer">
          <ChevronDown className="size-4" />
        </ComboboxPrimitive.Trigger>
      </ComboboxPrimitive.InputGroup>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner sideOffset={4} className="isolate z-50">
          <ComboboxPrimitive.Popup
            className={cn(
              'bg-popover text-popover-foreground ring-foreground/10',
              'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
              'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
              'w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-lg shadow-md ring-1 duration-100'
            )}
          >
            <ComboboxPrimitive.List
              className="max-h-60 overflow-y-auto p-1"
              onScroll={handleListScroll}
            >
              {options.map((option) => (
                <ComboboxPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                    'relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1 pl-2 pr-8 text-sm outline-none',
                    'data-disabled:pointer-events-none data-disabled:opacity-50'
                  )}
                >
                  {option.label}
                  <ComboboxPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center">
                    <Check className="size-3.5" />
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              ))}
              <ComboboxPrimitive.Empty className="text-muted-foreground py-2 text-center text-sm">
                {emptyMessage}
              </ComboboxPrimitive.Empty>
              {isLoadingMore && (
                <div className="flex justify-center py-2">
                  <LoaderCircle size={16} className="text-muted-foreground animate-spin" />
                </div>
              )}
            </ComboboxPrimitive.List>

            {footer && <div className="border-t p-1">{footer}</div>}
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}
