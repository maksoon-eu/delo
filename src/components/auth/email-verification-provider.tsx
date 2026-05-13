'use client';

import { createContext, type ReactNode } from 'react';

export const EmailVerificationContext = createContext(false);

type EmailVerificationProviderProps = {
  children: ReactNode;
  emailVerified: boolean;
};

export function EmailVerificationProvider(props: EmailVerificationProviderProps) {
  const { children, emailVerified } = props;

  return <EmailVerificationContext value={emailVerified}>{children}</EmailVerificationContext>;
}
