'use client';

import { useEffect, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/actions/button';
import { AtSignIcon } from '@/components/icons/at-sign';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { useRouterNavigate } from '@/hooks/use-router-navigate';

type VerifyEmailContentProps = {
  token: string | null;
};

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

      navigateTo('/profile?verification=success');
    }

    verifyEmail();
  }, [navigateTo, token]);

  function handleOpenLogin() {
    navigateTo('/login');
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-primary/10 text-primary flex h-20 items-center justify-center rounded-xl">
        <AtSignIcon size={32} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-foreground text-sm font-semibold">
          {displayError ? 'Не удалось подтвердить email' : 'Подождите несколько секунд'}
        </p>
        <p className="text-muted-foreground text-sm leading-6">
          {displayError ??
            'Если ссылка действительна, мы подтвердим email и автоматически войдём в аккаунт.'}
        </p>
      </div>
      {displayError && (
        <Button
          type="button"
          className="h-13 w-full rounded-lg text-base font-semibold"
          Icon={ArrowRightIcon}
          onClick={handleOpenLogin}
        >
          Перейти ко входу
        </Button>
      )}
    </div>
  );
}
