'use client';

import { createContext } from 'react';

export type CookieSettingsContextValue = {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

export const CookieSettingsContext = createContext<CookieSettingsContextValue | undefined>(
  undefined
);
