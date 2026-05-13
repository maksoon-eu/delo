import { VerifyEmailCard } from '@/components/auth/verify-email-card';

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { searchParams } = props;
  const { token } = await searchParams;

  return <VerifyEmailCard token={token ?? null} />;
}
