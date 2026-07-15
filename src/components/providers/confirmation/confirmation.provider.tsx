'use client';

import { useState, type ReactNode } from 'react';
import {
  ConfirmationContext,
  type ConfirmationOptions,
} from '@/components/providers/confirmation/confirmation.context';
import { ConfirmationDialog } from '@/components/ui/overlay/confirmation-dialog';
import { useAsyncAction } from '@/hooks/use-async-action';

type ConfirmationProviderProps = {
  children: ReactNode;
};

export function ConfirmationProvider(props: ConfirmationProviderProps) {
  const { children } = props;
  const [options, setOptions] = useState<ConfirmationOptions>({
    title: '',
    description: '',
    confirmLabel: '',
    action: () => Promise.resolve(),
  });
  const [isOpen, setIsOpen] = useState(false);

  async function runConfirmedAction() {
    if (!options) return;

    await options.action();
    setIsOpen(false);
  }

  const [executeConfirm, isLoading] = useAsyncAction(runConfirmedAction);

  function handleOpenChange(open: boolean) {
    if (isLoading || open) return;
    setIsOpen(false);
  }

  function handleSetOptions(newOptions: ConfirmationOptions) {
    setOptions(newOptions);
    setIsOpen(true);
  }

  return (
    <ConfirmationContext.Provider value={handleSetOptions}>
      {children}

      <ConfirmationDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        onConfirm={executeConfirm}
        title={options.title}
        description={options.description}
        confirmLabel={options.confirmLabel}
        Icon={options.Icon}
        isLoading={isLoading}
        destructive={options.destructive}
      />
    </ConfirmationContext.Provider>
  );
}
