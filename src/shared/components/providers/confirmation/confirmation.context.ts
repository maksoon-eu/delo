'use client';

import { createContext } from 'react';
import type { AnimatedIconComponent } from '@/types/icons';

export type ConfirmationOptions = {
  title: string;
  description: string;
  confirmLabel: string;
  action: () => Promise<void>;
  Icon?: AnimatedIconComponent;
  destructive?: boolean;
};

export type Confirm = (options: ConfirmationOptions) => void;

export const ConfirmationContext = createContext<Confirm | undefined>(undefined);
