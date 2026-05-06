import type { ReactNode } from 'react';
import { PublicHeader } from '@/components/public/public-header';

export default function PublicOrderLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}
