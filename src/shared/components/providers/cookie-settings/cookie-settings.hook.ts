'use client';

import { useContext } from 'react';
import { CookieSettingsContext } from './cookie-settings.context';

export function useCookieSettings() {
  const context = useContext(CookieSettingsContext);
  if (!context) throw new Error('useCookieSettings must be used within CookieSettingsProvider');

  return context;
}
