'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { AuthFormInput } from '@/components/auth/auth-form-input';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useRouterNavigate } from '@/hooks/use-router-navigate';
import { resetPassword } from '@/actions/auth';
import { ResetPasswordSchema, type ResetPasswordInput } from '@/schemas/auth';

export function ResetPasswordForm() {
  const { navigateTo } = useRouterNavigate();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: '' },
  });

  const { control, handleSubmit } = form;

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
    navigateTo('/');
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  function handleOpenForgotPassword() {
    navigateTo('/forgot-password');
  }

  if (!token) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border-destructive/25 bg-destructive/10 text-foreground flex gap-3 rounded-xl border p-4 text-sm leading-6">
          <AlertCircle size={20} className="text-destructive mt-0.5 shrink-0" aria-hidden />
          <p>Ссылка отсутствует или повреждена. Запросите новую ссылку для сброса пароля.</p>
        </div>

        <Button
          type="button"
          className="h-13 w-full rounded-lg text-base font-semibold"
          Icon={ArrowRightIcon}
          onClick={handleOpenForgotPassword}
        >
          Запросить снова
        </Button>
      </div>
    );
  }

  return (
    <Form {...form} onSubmit={handleSubmit(execute)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <AuthFormInput
          control={control}
          name="password"
          label="Новый пароль"
          type="password"
          placeholder="Введите новый пароль"
          autoComplete="new-password"
          Icon={LockKeyhole}
        />
        <AuthFormInput
          control={control}
          name="confirmPassword"
          label="Повторите пароль"
          type="password"
          placeholder="Повторите новый пароль"
          autoComplete="new-password"
          Icon={LockKeyhole}
        />
      </div>

      <Button
        type="submit"
        className="h-13 w-full rounded-lg text-base font-semibold"
        isLoading={isLoading}
        Icon={ArrowRightIcon}
      >
        Сохранить пароль
      </Button>
    </Form>
  );
}
