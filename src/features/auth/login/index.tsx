'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useRouterNavigate } from '@/shared/hooks/use-router-navigate';
import { LoginSchema, type LoginInput } from '@/shared/schemas/auth';
import { loginUser } from '@/actions/auth';
import { DASHBOARD_ROUTE } from '@/shared/constants/routes';
import { LOGIN_DEFAULT_VALUES } from './constants';
import { LoginFormView } from './ui/login-form';

export function LoginForm() {
  const { navigateTo } = useRouterNavigate();
  const { seconds: lockoutSeconds, start: startLockout, isActive: isLocked } = useCountdown();
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

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
    <LoginFormView
      form={form}
      isLoading={isLoading}
      isLocked={isLocked}
      lockoutSeconds={lockoutSeconds}
      onSubmit={execute}
    />
  );
}
