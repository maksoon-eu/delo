import type { ReactNode } from 'react';
import { PublicHeader } from '@/components/features/order/public-header';

export default function PublicOrderLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
