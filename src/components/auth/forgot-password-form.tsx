'use client';

import { Info, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { Button } from '@/components/ui/actions/button';
import { AuthFormInput } from '@/components/auth/auth-form-input';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { useCountdown } from '@/hooks/use-countdown';
import { useAsyncAction } from '@/hooks/use-async-action';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';
import { sendPasswordResetEmail } from '@/actions/auth';
import { PASSWORD_RESET_COOLDOWN_MS } from '@/constants/auth';

export function ForgotPasswordForm() {
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
    startCooldown(Math.ceil(PASSWORD_RESET_COOLDOWN_MS / 1000));
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return (
    <Form {...form} onSubmit={handleSubmit(execute)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <AuthFormInput
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="example@delo.ru"
          autoComplete="email"
          Icon={Mail}
        />

        <div className="border-primary/25 bg-primary/10 text-foreground flex gap-3 rounded-xl border p-4 text-sm leading-6">
          <Info size={20} className="text-primary mt-0.5 shrink-0" aria-hidden />
          <p>Письмо придёт в течение 2-5 минут. Проверьте папку Спам.</p>
        </div>
      </div>

      <Button
        type="submit"
        className="h-13 w-full rounded-lg text-base font-semibold"
        isLoading={isLoading}
        disabled={isCoolingDown}
        Icon={isCoolingDown ? undefined : ArrowRightIcon}
      >
        {isCoolingDown ? `Повторная отправка через ${cooldownSeconds} сек.` : 'Отправить ссылку'}
      </Button>
    </Form>
  );
}
