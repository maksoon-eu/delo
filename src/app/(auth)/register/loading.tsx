import { AuthLoadingSkeleton } from '@/features/auth/common/ui/auth-loading-skeleton';

export default function RegisterLoading() {
  return <AuthLoadingSkeleton fields={4} showAgreement />;
}
