'use client';

import { useContext } from 'react';
import { toast } from 'sonner';
import { EMAIL_VERIFICATION_REQUIRED_MESSAGE } from '@/constants/auth';
import { EmailVerificationContext } from './email-verification.context';

export function useRequireVerifiedEmail() {
  const emailVerified = useContext(EmailVerificationContext);

  function requireVerifiedEmail() {
    if (emailVerified) return true;

    toast.error(EMAIL_VERIFICATION_REQUIRED_MESSAGE);
    return false;
  }

  return requireVerifiedEmail;
}
