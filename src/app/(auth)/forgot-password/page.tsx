'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { IconButton } from '@/components/ui/actions/icon-button';
import { AuthCard } from '@/components/auth/auth-card';
import { AtSignIcon } from '@/components/icons/at-sign';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { sendPasswordResetEmail } from '@/actions/auth';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { control, handleSubmit, getValues } = form;

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    const { error } = await sendPasswordResetEmail(data);
    setIsLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    setSent(true);
  }

  return (
    <AuthCard
      title="Восстановление пароля."
      description={
        sent
          ? `Письмо отправлено на ${getValues('email')}`
          : 'Укажите email — пришлём ссылку для сброса'
      }
      formTitle="Сброс пароля"
      footerText="Вспомнили пароль?"
      footerLinkHref="/login"
    >
      {sent ? (
        <div className="bg-primary/8 border-primary/20 rounded-lg border px-4 py-3 text-sm">
          Проверьте почту. Ссылка действительна <span className="font-medium">1 час</span>.
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormInput
              control={control}
              name="email"
              label="Email"
              type="email"
              Icon={AtSignIcon}
            />
            <div className="pt-1">
              <IconButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                Icon={ArrowRightIcon}
              >
                Отправить ссылку
              </IconButton>
            </div>
          </form>
        </Form>
      )}
    </AuthCard>
  );
}
