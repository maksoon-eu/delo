import { AuthLoadingSkeleton } from '@/features/auth/auth-loading-skeleton';

export default function ForgotPasswordLoading() {
  return <AuthLoadingSkeleton fields={1} showInfo />;
}
