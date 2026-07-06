import { AuthLoadingSkeleton } from '@/components/auth/auth-loading-skeleton';

export default function LoginLoading() {
  return <AuthLoadingSkeleton fields={2} showForgotLink />;
}
