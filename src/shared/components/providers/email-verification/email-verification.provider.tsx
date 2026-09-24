'use client';

import type { ReactNode } from 'react';
import { EmailVerificationContext } from './email-verification.context';

type EmailVerificationProviderProps = {
  children: ReactNode;
  emailVerified: boolean;
};

export function EmailVerificationProvider(props: EmailVerificationProviderProps) {
  const { children, emailVerified } = props;

  return <EmailVerificationContext value={emailVerified}>{children}</EmailVerificationContext>;
}
