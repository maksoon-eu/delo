import { AuthLoadingSkeleton } from '@/features/auth/common/ui/auth-loading-skeleton';

export default function ForgotPasswordLoading() {
  return <AuthLoadingSkeleton fields={1} showInfo />;
}
