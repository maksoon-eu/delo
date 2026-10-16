'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { resendEmailVerification } from '@/actions/profile';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { EMAIL_VERIFICATION_COOLDOWN_MS } from '@/shared/constants/auth';
import { PROFILE_ROUTE } from '@/shared/constants/routes';
import type { UserProfile } from '@/shared/types/profile';
import { ProfileSecurityPanel } from './ui/security-panel';

type ProfileSecurityProps = { profile: UserProfile; verificationStatus?: 'success' };

export function ProfileSecurity(props: ProfileSecurityProps) {
  const { profile, verificationStatus } = props;
  const router = useRouter();
  const {
    seconds: cooldownSeconds,
    start: startCooldown,
    isActive: isCoolingDown,
  } = useCountdown();

  async function sendVerificationEmail() {
    const { error, retryAfter } = await resendEmailVerification();
    if (error) {
      if (retryAfter) startCooldown(retryAfter);
      throw new Error(error);
    }
    toast.success('Письмо подтверждения отправлено');
    startCooldown(Math.ceil(EMAIL_VERIFICATION_COOLDOWN_MS / 1000));
  }

  const [executeResend, isSending] = useAsyncAction(sendVerificationEmail);

  useEffect(() => {
    if (verificationStatus !== 'success') return;
    toast.success('Email подтверждён');
    router.replace(PROFILE_ROUTE, { scroll: false });
  }, [router, verificationStatus]);

  return (
    <ProfileSecurityPanel
      profile={profile}
      isSending={isSending}
      isCoolingDown={isCoolingDown}
      cooldownSeconds={cooldownSeconds}
      onSendVerification={executeResend}
    />
  );
}
