import { AuthLoadingSkeleton } from '@/components/auth/auth-loading-skeleton';

export default function VerifyEmailLoading() {
  return <AuthLoadingSkeleton variant="status" showButton={false} />;
}
