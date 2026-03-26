'use client';

import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { IconButton } from '@/components/ui/actions/icon-button';
import { AuthCard } from '@/components/auth/auth-card';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { resetPassword } from '@/actions/auth';
import { ResetPasswordSchema, type ResetPasswordInput } from '@/schemas/auth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: ResetPasswordInput) {
    if (!token) {
      toast.error('Токен отсутствует');
      return;
    }
    setIsLoading(true);
    const { error } = await resetPassword(token, data);
    setIsLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Пароль изменён — войдите с новым паролем');
    router.push('/login');
  }

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormInput
            control={control}
            name="password"
            label="Новый пароль"
            type="password"
            Icon={LockKeyholeIcon}
          />
          <div className="pt-1">
            <IconButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              Icon={ArrowRightIcon}
            >
              Сохранить пароль
            </IconButton>
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
