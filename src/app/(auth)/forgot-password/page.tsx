'use client';

import { useCountdown } from '@/hooks/use-countdown';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { Button } from '@/components/ui/actions/button';
import { AuthCard } from '@/components/auth/auth-card';
import { AtSignIcon } from '@/components/icons/at-sign';
import { sendPasswordResetEmail } from '@/actions/auth';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';

export default function ForgotPasswordPage() {
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
    const result = await sendPasswordResetEmail(data);

    if (result.error) {
      if (result.retryAfter) startCooldown(result.retryAfter);
      throw new Error(result.error);
    }

    toast.success('Письмо отправлено. Проверьте почту.');
    startCooldown(30);
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <AuthCard
      title="Сброс пароля"
      description="Введите email — мы пришлём ссылку для сброса"
      formTitle="Восстановление доступа"
      footerText="Вернуться ко входу"
      footerLinkHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(execute)} className="space-y-2">
          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            Icon={AtSignIcon}
          />
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
