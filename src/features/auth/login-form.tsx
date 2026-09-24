'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Form } from '@/shared/components/ui/form/form';
import { Button } from '@/shared/components/ui/actions/button';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useRouterNavigate } from '@/shared/hooks/use-router-navigate';
import { LoginSchema, type LoginInput } from '@/shared/schemas/auth';
import { loginUser } from '@/actions/auth';
import { DASHBOARD_ROUTE } from '@/constants/routes';

export function LoginForm() {
  const { navigateTo } = useRouterNavigate();
  const { seconds: lockoutSeconds, start: startLockout, isActive: isLocked } = useCountdown();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: LoginInput) {
    const { email, password } = data;
    const { error, retryAfter } = await loginUser(data);

    if (error) {
      if (retryAfter) startLockout(retryAfter);
      throw new Error(error);
    }

    const { error: signInError } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (signInError) {
      throw new Error('Произошла ошибка входа');
    }

    navigateTo(DASHBOARD_ROUTE);
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <Form {...form} onSubmit={handleSubmit(execute)} className="flex flex-col gap-2">
      <FormInput
        control={control}
        name="email"
        label="Электронная почта"
        type="email"
        autoComplete="username"
      />
      <FormInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        autoComplete="current-password"
      />

      <div className="flex justify-end text-xs sm:text-sm">
        <Link
          href="/forgot-password"
          className="text-primary font-semibold underline-offset-4 hover:underline"
        >
          Забыли пароль?
        </Link>
      </div>

      <Button
        type="submit"
        className="h-13 w-full rounded-xl text-sm font-bold"
        isLoading={isLoading}
        disabled={isLocked}
        Icon={isLocked ? undefined : ArrowRightIcon}
      >
        {isLocked ? `Повторите через ${lockoutSeconds} сек.` : 'Войти'}
      </Button>
    </Form>
  );
}
