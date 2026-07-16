'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { FormCheckbox } from '@/components/ui/form/fields/form-checkbox';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useRouterNavigate } from '@/hooks/use-router-navigate';
import { RegisterSchema, type RegisterInput } from '@/schemas/auth';
import { registerUser } from '@/actions/auth';
import { LEGAL_PRIVACY_PATH, LEGAL_TERMS_PATH } from '@/constants/legal';

export function RegisterForm() {
  const { navigateTo } = useRouterNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', legalAccepted: false },
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
      navigateTo('/login');
      throw new Error('Регистрация прошла успешно. Войдите в аккаунт.');
    }

    toast.success('Мы отправили ссылку подтверждения на ваш email');
    navigateTo('/profile');
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <Form {...form} onSubmit={handleSubmit(execute)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <FormInput control={control} name="name" label="Имя" autoComplete="name" />
        <FormInput control={control} name="email" label="Email" type="email" autoComplete="email" />
        <FormInput
          control={control}
          name="password"
          label="Пароль"
          type="password"
          autoComplete="new-password"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          label="Подтвердить пароль"
          type="password"
          autoComplete="new-password"
        />
      </div>

      <FormCheckbox control={control} name="legalAccepted">
        Я принимаю{' '}
        <Link href={LEGAL_TERMS_PATH} className="text-primary underline underline-offset-4">
          условия использования
        </Link>{' '}
        и соглашаюсь с{' '}
        <Link href={LEGAL_PRIVACY_PATH} className="text-primary underline underline-offset-4">
          политикой обработки персональных данных
        </Link>
      </FormCheckbox>

      <Button
        type="submit"
        className="h-13 w-full rounded-lg text-base font-semibold"
        isLoading={isLoading}
        Icon={ArrowRightIcon}
      >
        Создать аккаунт
      </Button>
    </Form>
  );
}
