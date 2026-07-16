'use client';

import { useEffect } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CircleAlert, CircleCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/actions/button';
import { Badge } from '@/components/ui/data/badge';
import { DetailItem } from '@/components/ui/data/detail-item';
import { SectionCard } from '@/components/ui/data/section-card';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { ProfileImageUpload } from '@/components/profile/profile-image-upload';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { SendIcon } from '@/components/icons/send';
import { useAsyncAction } from '@/hooks/use-async-action';
import { useCountdown } from '@/hooks/use-countdown';
import { resendEmailVerification, updateProfile } from '@/actions/profile';
import { ProfileSchema, type ProfileInput } from '@/schemas/profile';
import { EMAIL_VERIFICATION_COOLDOWN_MS } from '@/constants/auth';
import { formatDate } from '@/utils/format';
import type { UserProfile } from '@/types/profile';

type ProfileFormProps = {
  profile: UserProfile;
  verificationStatus?: 'success';
};

export function ProfileForm(props: ProfileFormProps) {
  const { profile, verificationStatus } = props;
  const router = useRouter();

  const form = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile.name,
      workTerms: profile.workTerms ?? '',
    },
  });

  const { control, handleSubmit, reset } = form;
  const emailVerified = !!profile.emailVerified;
  const {
    seconds: cooldownSeconds,
    start: startCooldown,
    isActive: isCoolingDown,
  } = useCountdown();

  async function updateProfileImmediately(data: ProfileInput) {
    const { error } = await updateProfile(data);
    if (error) throw new Error(error);

    toast.success('Профиль обновлён');
    reset(data);
    router.refresh();
  }

  async function sendVerificationEmail() {
    const { error, retryAfter } = await resendEmailVerification();
    if (error) {
      if (retryAfter) startCooldown(retryAfter);
      throw new Error(error);
    }

    toast.success('Письмо подтверждения отправлено');
    startCooldown(Math.ceil(EMAIL_VERIFICATION_COOLDOWN_MS / 1000));
  }

  const [executeUpdate, isUpdating] = useAsyncAction(updateProfileImmediately);
  const [executeResend, isSending] = useAsyncAction(sendVerificationEmail);

  useEffect(() => {
    if (verificationStatus !== 'success') return;

    toast.success('Email подтверждён');
    router.replace('/profile' as Route, { scroll: false });
  }, [router, verificationStatus]);

  return (
    <div className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
      <div className="surface-shadow border-border from-primary/10 via-card/60 to-card/60 bg-linear-to-br rounded-2xl border p-7">
        <ProfileImageUpload initialImage={profile.image} name={profile.name} />

        <div className="border-border mt-7 border-t pt-7">
          <Form {...form} onSubmit={handleSubmit(executeUpdate)} className="space-y-5">
            <FormInput control={control} name="name" label="Имя" autoComplete="name" />
            <FormTextarea control={control} name="workTerms" label="Условия работы" rows={7} />
            <div className="flex justify-end">
              <Button type="submit" Icon={ArrowRightIcon} isLoading={isUpdating}>
                Сохранить изменения
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <SectionCard
        title="Безопасность и аккаунт"
        Icon={ShieldCheck}
        titleClassName="text-lg"
        className="self-start p-7"
      >
        <dl className="grid gap-x-4 gap-y-6 lg:grid-cols-2 [&_dd]:mt-1 [&_dt]:uppercase">
          <DetailItem label="Email">{profile.email}</DetailItem>
          <DetailItem label="Статус аккаунта">
            <Badge
              variant={emailVerified ? 'accent' : 'destructive'}
              size="sm"
              Icon={emailVerified ? CircleCheck : CircleAlert}
              className={emailVerified ? 'text-primary' : undefined}
            >
              {emailVerified ? 'Подтверждён' : 'Не подтверждён'}
            </Badge>
          </DetailItem>
          {profile.emailVerified && (
            <DetailItem label="Дата подтверждения">
              {formatDate(profile.emailVerified, 'd MMMM yyyy')}
            </DetailItem>
          )}
          <DetailItem label="Аккаунт создан">
            {formatDate(profile.createdAt, 'd MMMM yyyy')}
          </DetailItem>
        </dl>

        {!emailVerified && (
          <Button
            className="mt-6 w-full"
            variant="outline"
            Icon={SendIcon}
            isLoading={isSending}
            disabled={isCoolingDown}
            onClick={executeResend}
          >
            {isCoolingDown ? `Повторите через ${cooldownSeconds}` : 'Отправить ссылку'}
          </Button>
        )}
      </SectionCard>
    </div>
  );
}
