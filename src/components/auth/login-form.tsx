'use client';

import Link from 'next/link';
import { Mail, LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Form } from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { AuthFormInput } from '@/components/auth/auth-form-input';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { useCountdown } from '@/hooks/use-countdown';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useRouterNavigate } from '@/hooks/use-router-navigate';
import { LoginSchema, type LoginInput } from '@/schemas/auth';
import { loginUser } from '@/actions/auth';

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

    navigateTo('/');
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <Form {...form} onSubmit={handleSubmit(execute)} className="flex flex-col gap-2">
      <AuthFormInput
        control={control}
        name="email"
        label="Электронная почта"
        type="email"
        placeholder="name@company.com"
        autoComplete="username"
        Icon={Mail}
      />
      <AuthFormInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        autoComplete="current-password"
        Icon={LockKeyhole}
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
