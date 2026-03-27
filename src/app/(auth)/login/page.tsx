'use client';

import { useCountdown } from '@/hooks/use-countdown';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { LoginSchema, type LoginInput } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/actions/button';
import { AuthCard } from '@/components/auth/auth-card';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { AtSignIcon } from '@/components/icons/at-sign';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
import { loginUser } from '@/actions/auth';

export default function LoginPage() {
  const router = useRouter();
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

    router.push('/');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

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
        <form onSubmit={handleSubmit(execute)} className="space-y-2">
          <FormInput control={control} name="email" label="Email" type="email" Icon={AtSignIcon} />
          <FormInput
            control={control}
            name="password"
            label="Пароль"
            type="password"
            Icon={LockKeyholeIcon}
          />
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLocked}
              Icon={ArrowRightIcon}
            >
              {isLocked ? `Повторите через ${lockoutSeconds} сек.` : 'Войти'}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
