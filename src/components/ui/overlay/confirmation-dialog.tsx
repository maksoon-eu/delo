'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Button } from '@/components/ui/actions/button';
import type { AnimatedIconComponent } from '@/types/icons';
import { cn } from '@/utils/cn';

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  Icon?: AnimatedIconComponent;
  isLoading?: boolean;
  destructive?: boolean;
};

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    confirmLabel,
    Icon,
    isLoading,
    destructive,
  } = props;

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 z-60 fixed inset-0 bg-black/40 backdrop-blur-sm duration-200" />
        <Dialog.Viewport className="z-60 fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Popup className="border-border bg-card data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 max-w-110 flex w-full flex-col items-center gap-6 rounded-2xl border p-8 shadow-xl outline-none duration-200">
            {Icon && (
              <div
                className={cn(
                  'text-primary-foreground flex size-12 items-center justify-center rounded-full',
                  destructive ? 'bg-destructive' : 'bg-primary'
                )}
              >
                <Icon size={24} />
              </div>
            )}

            <div className="w-full space-y-2 text-center">
              <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Description className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </Dialog.Description>
            </div>

            <div className="flex w-full gap-3">
              <Button
                type="button"
                variant="secondary"
                className="h-11 flex-1"
                disabled={isLoading}
                onClick={handleCancel}
              >
                Отменить
              </Button>
              <Button
                type="button"
                variant={destructive ? 'destructive' : 'default'}
                className={cn(
                  'h-11 flex-1',
                  destructive && 'bg-destructive text-primary-foreground hover:bg-destructive/90'
                )}
                isLoading={isLoading}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
