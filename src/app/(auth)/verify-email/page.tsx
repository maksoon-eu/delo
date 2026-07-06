import { VerifyEmailContent } from '@/components/auth/verify-email-content';

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { searchParams } = props;
  const { token } = await searchParams;

  return <VerifyEmailContent token={token ?? null} />;
}
