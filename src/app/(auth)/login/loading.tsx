import { AuthLoadingSkeleton } from '@/components/features/auth/auth-loading-skeleton';

export default function LoginLoading() {
  return <AuthLoadingSkeleton fields={2} showForgotLink />;
}
