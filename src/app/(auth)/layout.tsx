import type { ReactNode } from 'react';
import { AuthFrame } from '@/features/auth/auth-frame';
import { AuthLayoutContent } from '@/features/auth/auth-layout-content';

export default function AuthLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <AuthFrame>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </AuthFrame>
  );
}
