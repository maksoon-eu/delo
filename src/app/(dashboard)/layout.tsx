import { redirect } from 'next/navigation';
import { auth } from '@/config/auth';
import { db } from '@/config/db';
import { EmailVerificationProvider } from '@/components/auth/email-verification-provider';
import { AppSidebarServer } from '@/components/layout/sidebar/sidebar-server';
import { TopBar } from '@/components/layout/top-bar';
import type { ReactNode } from 'react';

export default async function DashboardLayout(props: { children: ReactNode }) {
  const { children } = props;

  const session = await auth();
  if (!session) redirect('/login');

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, emailVerified: true },
  });

  return (
    <EmailVerificationProvider emailVerified={!!user?.emailVerified}>
      <div className="flex min-h-screen flex-1 overflow-hidden p-4">
        <AppSidebarServer />
        <div className="flex min-w-0 flex-1 flex-col gap-4 pl-4">
          <TopBar userName={user?.name ?? session.user.name} userImage={user?.image ?? null} />
          <main className="flex flex-1 flex-col overflow-y-auto">{children}</main>
        </div>
      </div>
    </EmailVerificationProvider>
  );
}
