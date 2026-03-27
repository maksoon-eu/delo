'use client';

import { useState } from 'react';
import { useCountdown } from '@/hooks/use-countdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { Button } from '@/components/ui/actions/button';
import { AuthCard } from '@/components/auth/auth-card';
import { AtSignIcon } from '@/components/icons/at-sign';
import { sendPasswordResetEmail } from '@/actions/auth';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    seconds: cooldownSeconds,
    start: startCooldown,
    isActive: isCoolingDown,
  } = useCountdown();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    const result = await sendPasswordResetEmail(data);
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error);
      if (result.retryAfter) startCooldown(result.retryAfter);
      return;
    }

    toast.success('Письмо отправлено. Проверьте почту.');
    startCooldown(30);
  }

  return (
    <AuthCard
      title="Сброс пароля"
      description="Введите email — мы пришлём ссылку для сброса"
      formTitle="Восстановление доступа"
      footerText="Вернуться ко входу"
      footerLinkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormInput control={control} name="email" label="Email" type="email" Icon={AtSignIcon} />
          <div className="pt-1">
            <Button type="submit" className="w-full" isLoading={isLoading} disabled={isCoolingDown}>
              {isCoolingDown
                ? `Повторная отправка через ${cooldownSeconds} сек.`
                : 'Отправить письмо'}
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}
