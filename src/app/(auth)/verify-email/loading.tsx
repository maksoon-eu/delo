import { AuthLoadingSkeleton } from '@/features/auth/auth-loading-skeleton';

export default function VerifyEmailLoading() {
  return <AuthLoadingSkeleton variant="status" showButton={false} />;
}
