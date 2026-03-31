'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { XIcon } from "@/components/icons/x";

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: 'md' | 'lg';
};

export function AppDialog(props: AppDialogProps) {
  const { open, onOpenChange, title, description, children, size = 'md' } = props;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 fixed inset-0 bg-black/40 backdrop-blur-sm duration-200" />
        <Dialog.Viewport className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Popup
            className={cn(
              'glass data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 flex max-h-[calc(100svh-2rem)] w-full flex-col overflow-hidden rounded-xl border shadow-lg duration-200',
              size === 'lg' ? 'max-w-3xl' : 'max-w-lg'
            )}
          >
            <div className="flex shrink-0 items-start justify-between border-b p-5 pb-4">
              <div>
                <Dialog.Title className="text-base font-semibold">{title}</Dialog.Title>
                {description && (
                  <Dialog.Description className="text-muted-foreground mt-0.5 text-sm">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close className="text-muted-foreground hover:text-foreground -mr-1 -mt-0.5 cursor-pointer rounded p-1 transition-colors">
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
