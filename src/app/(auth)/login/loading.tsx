import { AuthLoadingSkeleton } from '@/features/auth/auth-loading-skeleton';

export default function LoginLoading() {
  return <AuthLoadingSkeleton fields={2} showForgotLink />;
}
