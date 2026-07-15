'use client';

import { useContext } from 'react';
import { ConfirmationContext } from '@/components/providers/confirmation/confirmation.context';

export function useConfirmation() {
  const confirm = useContext(ConfirmationContext);

  if (!confirm) {
    throw new Error('useConfirmation must be used within ConfirmationProvider');
  }

  return confirm;
}
