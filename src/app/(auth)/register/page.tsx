'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: RegisterInput) {
    const { email, password } = data;
    setIsLoading(true);

    const { error } = await registerUser(data);
    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    const { error: signInError } = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (signInError) {
      toast.error('Регистрация прошла успешно. Войдите в аккаунт.');
      router.push('/login');
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <AuthCard
      title="Начни вести дела. Это просто."
      description="Создайте аккаунт — это бесплатно"
      formTitle="Регистрация"
      footerText="Уже есть аккаунт?"
      footerLinkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormInput control={control} name="name" label="Имя" Icon={UserIcon} />
          <FormInput control={control} name="email" label="Email" type="email" Icon={AtSignIcon} />
          <FormInput
            control={control}
            name="password"
            label="Пароль"
            type="password"
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
