'use client';

import { Suspense } from 'react';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/actions/button';
import { AuthCard } from '@/components/auth/auth-card';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { resetPassword } from '@/actions/auth';
import { ResetPasswordSchema, type ResetPasswordInput } from '@/schemas/auth';

function ResetPasswordForm() {
  const router = useRouter();
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
    router.push('/');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  if (!token) {
    return (
      <AuthCard
        title="Недействительная ссылка."
        description="Запросите новую ссылку для сброса пароля"
        formTitle="Ошибка"
        footerText="Запросить снова"
        footerLinkHref="/forgot-password"
      >
        <p className="text-muted-foreground text-sm">Ссылка отсутствует или повреждена.</p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Новый пароль."
      description="Придумайте надёжный пароль для вашего аккаунта"
      formTitle="Сброс пароля"
      footerText="Вспомнили пароль?"
      footerLinkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(execute)} className="space-y-2">
          <FormInput
            control={control}
            name="password"
            label="Новый пароль"
            type="password"
            Icon={LockKeyholeIcon}
          />
          <div className="pt-1">
            <Button type="submit" className="w-full" isLoading={isLoading} Icon={ArrowRightIcon}>
              Сохранить пароль
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
