'use client';

import { useEffect, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouterNavigate } from '@/shared/hooks/use-router-navigate';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '@/shared/constants/routes';
import { VerifyEmailView } from './ui/verify-email-content';

type VerifyEmailContentProps = { token: string | null };

export function VerifyEmailContent(props: VerifyEmailContentProps) {
  const { token } = props;
  const { navigateTo } = useRouterNavigate();
  const startedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const tokenError = token ? null : 'Ссылка подтверждения недействительна';
  const displayError = tokenError ?? error;

  useEffect(() => {
    if (!token || startedRef.current) return;
    startedRef.current = true;

    async function verifyEmail() {
      const result = await signIn('credentials', {
        verificationToken: token,
        redirect: false,
      });
      if (result?.error) {
        setError('Ссылка подтверждения недействительна или истекла');
        return;
      }
      navigateTo(`${PROFILE_ROUTE}?verification=success`);
    }

    verifyEmail();
  }, [navigateTo, token]);

  function handleOpenLogin() {
    navigateTo(LOGIN_ROUTE);
  }

  return <VerifyEmailView displayError={displayError} onOpenLogin={handleOpenLogin} />;
}
