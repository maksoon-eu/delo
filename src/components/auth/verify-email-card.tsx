'use client';

import { useEffect, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/actions/button';
import { AtSignIcon } from '@/components/icons/at-sign';
import { ArrowRightIcon } from '@/components/icons/arrow-right';

type VerifyEmailCardProps = {
  token: string | null;
};

export function VerifyEmailCard(props: VerifyEmailCardProps) {
  const { token } = props;
  const router = useRouter();
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

      router.push('/profile?verification=success' as Route);
      router.refresh();
    }

    verifyEmail();
  }, [router, token]);

  function handleOpenLogin() {
    router.push('/login' as Route);
  }

  return (
    <AuthCard
      title="Подтверждаем email"
      description="Проверяем ссылку и открываем аккаунт"
      formTitle={displayError ? 'Не удалось подтвердить email' : 'Подождите несколько секунд'}
      footerText="Войти вручную"
      footerLinkHref="/login"
    >
      <div className="space-y-4">
        <div className="bg-primary/10 text-primary flex h-20 items-center justify-center rounded-lg">
          <AtSignIcon size={32} />
        </div>
        <p className="text-muted-foreground text-sm">
          {displayError ??
            'Если ссылка действительна, мы подтвердим email и автоматически войдём в аккаунт.'}
        </p>
        {displayError && (
          <Button type="button" className="w-full" Icon={ArrowRightIcon} onClick={handleOpenLogin}>
            Перейти ко входу
          </Button>
        )}
      </div>
    </AuthCard>
  );
}
