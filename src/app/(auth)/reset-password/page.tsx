import { Suspense } from 'react';
import { ResetPasswordForm } from '@/features/auth/reset-password';

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
