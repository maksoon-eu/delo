import { AuthLoadingSkeleton } from '@/features/auth/common/ui/auth-loading-skeleton';

export default function VerifyEmailLoading() {
  return <AuthLoadingSkeleton variant="status" showButton={false} />;
}
