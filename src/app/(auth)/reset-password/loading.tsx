import { AuthLoadingSkeleton } from '@/features/auth/common/ui/auth-loading-skeleton';

export default function ResetPasswordLoading() {
  return <AuthLoadingSkeleton fields={2} />;
}
