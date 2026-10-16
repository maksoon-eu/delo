'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useRouterNavigate } from '@/shared/hooks/use-router-navigate';
import { resetPassword } from '@/actions/auth';
import { ResetPasswordSchema, type ResetPasswordInput } from '@/shared/schemas/auth';
import { DASHBOARD_ROUTE } from '@/shared/constants/routes';
import { RESET_PASSWORD_DEFAULT_VALUES } from './constants';
import { ResetPasswordFormView } from './ui/reset-password-form';

export function ResetPasswordForm() {
  const { navigateTo } = useRouterNavigate();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
  });

  async function onSubmit(data: ResetPasswordInput) {
    if (!token) {
      throw new Error('Токен отсутствует');
    }
    const { error, email, password } = await resetPassword(token, data);
    if (error) {
      throw new Error(error);
    }
    await signIn('credentials', { email, password, redirect: false });
    toast.success('Пароль успешно обновлён');
    navigateTo(DASHBOARD_ROUTE);
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  function handleOpenForgotPassword() {
    navigateTo('/forgot-password');
  }

  return (
    <ResetPasswordFormView
      form={form}
      isLoading={isLoading}
      hasToken={!!token}
      onSubmit={execute}
      onOpenForgotPassword={handleOpenForgotPassword}
    />
  );
}
