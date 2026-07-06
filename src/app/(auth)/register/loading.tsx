import { AuthLoadingSkeleton } from '@/components/auth/auth-loading-skeleton';

export default function RegisterLoading() {
  return <AuthLoadingSkeleton fields={4} showAgreement />;
}
