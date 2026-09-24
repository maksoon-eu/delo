import { AuthLoadingSkeleton } from '@/features/auth/auth-loading-skeleton';

export default function ResetPasswordLoading() {
  return <AuthLoadingSkeleton fields={2} />;
}
