'use client';

import { useAsyncAction } from '@/hooks/use-async-action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/actions/button';
import { AuthCard } from '@/components/auth/auth-card';
import { UserRoundPlusIcon } from '@/components/icons/user-round-plus';
import { UserIcon } from '@/components/icons/user';
import { AtSignIcon } from '@/components/icons/at-sign';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
import { registerUser } from '@/actions/auth';
import { RegisterSchema, type RegisterInput } from '@/schemas/auth';

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: RegisterInput) {
    const { email, password } = data;
    const { error } = await registerUser(data);

    if (error) {
      throw new Error(error);
    }

    const { error: signInError } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (signInError) {
      router.push('/login');
      throw new Error('Регистрация прошла успешно. Войдите в аккаунт.');
    }

    router.push('/');
    router.refresh();
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <AuthCard
      title="Начни вести дела. Это просто."
      description="Создайте аккаунт — это бесплатно"
      formTitle="Регистрация"
      footerText="Уже есть аккаунт?"
      footerLinkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(execute)} className="space-y-2">
          <FormInput
            control={control}
            name="name"
            label="Имя"
            autoComplete="name"
            Icon={UserIcon}
          />
          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            Icon={AtSignIcon}
          />
          <FormInput
            control={control}
            name="password"
            label="Пароль"
            type="password"
            autoComplete="new-password"
            Icon={LockKeyholeIcon}
          />
          <div className="pt-1">
            <Button type="submit" className="w-full" isLoading={isLoading} Icon={UserRoundPlusIcon}>
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
