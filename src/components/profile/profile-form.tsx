'use client';

import { useEffect } from 'react';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/actions/button';
import { ContentCard } from '@/components/ui/data/content-card';
import { DetailItem } from '@/components/ui/data/detail-item';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { ProfileImageUpload } from '@/components/profile/profile-image-upload';
import { SendIcon } from '@/components/icons/send';
import { UserIcon } from '@/components/icons/user';
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
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
      <ContentCard className="h-full space-y-5">
        <ProfileImageUpload initialImage={profile.image} name={profile.name} />

        <Form {...form}>
          <form onSubmit={handleSubmit(executeUpdate)} className="space-y-4">
            <FormInput
              control={control}
              name="name"
              label="Имя"
              autoComplete="name"
              Icon={UserIcon}
            />
            <FormTextarea control={control} name="workTerms" label="Условия работы" rows={6} />
            <div className="flex justify-end">
              <Button type="submit" Icon={UserIcon} isLoading={isUpdating}>
                Сохранить
              </Button>
            </div>
          </form>
        </Form>
      </ContentCard>

      <div className="flex h-full flex-col gap-5">
        <ContentCard className="flex-1">
          <h2 className="mb-4 font-semibold">Email</h2>
          <dl className="space-y-4">
            <DetailItem label="Адрес">{profile.email}</DetailItem>
            <DetailItem label="Статус">
              <span className={emailVerified ? 'text-primary' : 'text-destructive'}>
                {emailVerified ? 'Подтверждён' : 'Не подтверждён'}
              </span>
            </DetailItem>
            {profile.emailVerified && (
              <DetailItem label="Дата подтверждения">
                {formatDate(profile.emailVerified, 'd MMMM yyyy')}
              </DetailItem>
            )}
          </dl>
          {!emailVerified && (
            <Button
              className="mt-5 w-full"
              variant="outline"
              Icon={SendIcon}
              isLoading={isSending}
              disabled={isCoolingDown}
              onClick={executeResend}
            >
              {isCoolingDown ? `Повторите через ${cooldownSeconds}` : 'Отправить ссылку'}
            </Button>
          )}
        </ContentCard>

        <ContentCard className="flex-1">
          <h2 className="mb-4 font-semibold">Аккаунт</h2>
          <dl className="space-y-4">
            <DetailItem label="Создан">{formatDate(profile.createdAt, 'd MMMM yyyy')}</DetailItem>
          </dl>
        </ContentCard>
      </div>
    </div>
  );
}
