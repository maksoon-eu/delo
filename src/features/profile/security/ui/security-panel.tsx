'use client';

import { CircleAlert, CircleCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/shared/components/ui/actions/button';
import { Badge } from '@/shared/components/ui/data/badge';
import { DetailItem } from '@/shared/components/ui/data/detail-item';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { SendIcon } from '@/shared/components/icons/send';
import { formatDate } from '@/shared/utils/format';
import type { UserProfile } from '@/shared/types/profile';

type ProfileSecurityPanelProps = {
  profile: UserProfile;
  isSending: boolean;
  isCoolingDown: boolean;
  cooldownSeconds: number;
  onSendVerification: () => Promise<void>;
};

export function ProfileSecurityPanel(props: ProfileSecurityPanelProps) {
  const { profile, isSending, isCoolingDown, cooldownSeconds, onSendVerification } = props;
  const emailVerified = !!profile.emailVerified;

  return (
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
          onClick={onSendVerification}
        >
          {isCoolingDown ? `Повторите через ${cooldownSeconds}` : 'Отправить ссылку'}
        </Button>
      )}
    </SectionCard>
  );
}
