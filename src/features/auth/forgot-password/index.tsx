'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/shared/schemas/auth';
import { sendPasswordResetEmail } from '@/actions/auth';
import { PASSWORD_RESET_COOLDOWN_MS } from '@/shared/constants/auth';
import { FORGOT_PASSWORD_DEFAULT_VALUES } from './constants';
import { ForgotPasswordFormView } from './ui/forgot-password-form';

export function ForgotPasswordForm() {
  const {
    seconds: cooldownSeconds,
    start: startCooldown,
    isActive: isCoolingDown,
  } = useCountdown();
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: FORGOT_PASSWORD_DEFAULT_VALUES,
  });

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
    <ForgotPasswordFormView
      form={form}
      isLoading={isLoading}
      isCoolingDown={isCoolingDown}
      cooldownSeconds={cooldownSeconds}
      onSubmit={execute}
    />
  );
}
