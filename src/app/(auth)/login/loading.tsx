import { AuthLoadingSkeleton } from '@/features/auth/common/ui/auth-loading-skeleton';

export default function LoginLoading() {
  return <AuthLoadingSkeleton fields={2} showForgotLink />;
}
