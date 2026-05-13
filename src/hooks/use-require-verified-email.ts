'use client';

import { useContext } from 'react';
import { toast } from 'sonner';
import { EmailVerificationContext } from '@/components/auth/email-verification-provider';
import { EMAIL_VERIFICATION_REQUIRED_MESSAGE } from '@/constants/auth';

export function useRequireVerifiedEmail() {
  const emailVerified = useContext(EmailVerificationContext);

  function requireVerifiedEmail() {
    if (emailVerified) return true;

    toast.error(EMAIL_VERIFICATION_REQUIRED_MESSAGE);
    return false;
  }

  return requireVerifiedEmail;
}
