import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SEO_PRIVATE_ROBOTS } from '@/shared/constants/seo';
import { AuthFrame } from '@/features/auth/common/ui/auth-frame';
import { AuthLayoutContent } from '@/features/auth/layout';

export const metadata: Metadata = { robots: SEO_PRIVATE_ROBOTS };

export default function AuthLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <AuthFrame>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </AuthFrame>
  );
}
