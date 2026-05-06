import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AppSidebarServer } from '@/components/layout/sidebar/sidebar-server';
import { TopBar } from '@/components/layout/top-bar';
import type { ReactNode } from 'react';

export default async function DashboardLayout(props: { children: ReactNode }) {
  const { children } = props;

  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen flex-1 overflow-hidden">
      <AppSidebarServer />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar userName={session.user.name} />
        <main className="flex flex-1 flex-col overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
