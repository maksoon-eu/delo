import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ProfileForm } from '@/components/profile/profile-form';
import { UserIcon } from '@/components/icons/user';
import { getProfile } from '@/actions/profile';

type ProfilePageProps = {
  searchParams: Promise<{ verification?: string }>;
};

export default async function ProfilePage(props: ProfilePageProps) {
  const { searchParams } = props;
  const { verification } = await searchParams;

  const profile = await getProfile();
  if (!profile) notFound();

  const verificationStatus = verification === 'success' ? 'success' : undefined;

  return (
    <div className="page-stack flex-1">
      <PageHeader
        Icon={UserIcon}
        title="Профиль"
        description="Данные исполнителя и условия работы"
      />
      <AnimateIn>
        <ProfileForm profile={profile} verificationStatus={verificationStatus} />
      </AnimateIn>
    </div>
  );
}
