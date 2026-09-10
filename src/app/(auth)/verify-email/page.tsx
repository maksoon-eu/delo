import { VerifyEmailContent } from '@/components/features/auth/verify-email-content';

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { searchParams } = props;
  const { token } = await searchParams;

  return <VerifyEmailContent token={token ?? null} />;
}
