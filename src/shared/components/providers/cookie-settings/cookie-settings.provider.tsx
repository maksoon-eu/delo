'use client';

import { useState, type ReactNode } from 'react';
import { CookieConsent } from '@/shared/components/layout/cookie-consent';
import { CookieSettingsContext } from './cookie-settings.context';

type CookieSettingsProviderProps = {
  analyticsEnabled: boolean;
  children: ReactNode;
};

export function CookieSettingsProvider(props: CookieSettingsProviderProps) {
  const { analyticsEnabled, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  function openSettings() {
    setIsOpen(true);
  }

  function closeSettings() {
    setIsOpen(false);
  }

  return (
    <CookieSettingsContext.Provider value={{ isOpen, openSettings, closeSettings }}>
      {children}
      <CookieConsent analyticsEnabled={analyticsEnabled} />
    </CookieSettingsContext.Provider>
  );
}
