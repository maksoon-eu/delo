'use client';

import { useState } from 'react';
import { useCountdown } from '@/hooks/use-countdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { LoginSchema, type LoginInput } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { IconButton } from '@/components/ui/actions/icon-button';
import { AuthCard } from '@/components/auth/auth-card';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { AtSignIcon } from '@/components/icons/at-sign';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
import { loginUser } from '@/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { seconds: lockoutSeconds, start: startLockout, isActive: isLocked } = useCountdown();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: LoginInput) {
    const { email, password } = data;
    setIsLoading(true);

    const { error, retryAfter } = await loginUser(data);

    if (error) {
      setIsLoading(false);
      toast.error(error);
      if (retryAfter) startLockout(retryAfter);
      return;
    }

    const { error: signInError } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);

    if (signInError) {
      toast.error('Произошла ошибка входа');
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <AuthCard
      title="Клиенты, заказы и деньги — всё в одном месте."
      description="Войдите, чтобы продолжить работу"
      formTitle="Вход в аккаунт"
      footerText="Нет аккаунта?"
      footerLinkHref="/register"
      forgotPasswordHref="/forgot-password"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormInput control={control} name="email" label="Email" type="email" Icon={AtSignIcon} />
          <FormInput
            control={control}
            name="password"
            label="Пароль"
            type="password"
            Icon={LockKeyholeIcon}
          />
          <div className="pt-1">
            <IconButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLocked}
              Icon={ArrowRightIcon}
            >
              {isLocked ? `Повторите через ${lockoutSeconds} сек.` : 'Войти'}
            </IconButton>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
