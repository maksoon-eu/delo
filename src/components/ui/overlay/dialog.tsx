'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ComponentType, ReactNode } from 'react';
import { XIcon } from '@/components/icons/x';
import { cn } from '@/utils/cn';

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
  size?: 'md' | 'lg';
  layer?: 'base' | 'nested';
  variant?: 'default' | 'solid';
};

export function AppDialog(props: AppDialogProps) {
  const {
    open,
    onOpenChange,
    title,
    description,
    Icon,
    children,
    size = 'md',
    layer = 'base',
    variant = 'default',
  } = props;
  const layerClass = layer === 'nested' ? 'z-[60]' : 'z-[40]';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          forceRender={layer === 'nested'}
          className={cn(
            'data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 bg-black/40 backdrop-blur-sm duration-200',
            layerClass
          )}
        />
        <Dialog.Viewport
          className={cn('fixed inset-0 flex items-center justify-center p-4', layerClass)}
        >
          <Dialog.Popup
            className={cn(
              'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 flex max-h-[calc(100svh-2rem)] w-full flex-col overflow-hidden rounded-xl border shadow-lg duration-200',
              variant === 'solid' ? 'border-border bg-card rounded-2xl' : 'glass',
              size === 'lg' ? 'max-w-4xl' : 'max-w-lg'
            )}
          >
            <div className="border-border border-l-primary flex shrink-0 items-center justify-between gap-4 border-b border-l-4 p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="border-primary/20 bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl border">
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
                  {description && (
                    <Dialog.Description className="text-muted-foreground mt-1 text-sm">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
              </div>
              <Dialog.Close className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer rounded p-1 transition-colors">
                <XIcon size={24} />
              </Dialog.Close>
            </div>
            <div className="overflow-y-auto p-5">{children}</div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
