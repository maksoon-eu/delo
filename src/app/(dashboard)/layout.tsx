import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AppSidebar } from '@/components/layout/sidebar/sidebar';
import { TopBar } from '@/components/layout/top-bar';
import { ReactNode } from 'react';

export default async function DashboardLayout(props: { children: ReactNode }) {
  const { children } = props;

  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="bg-background flex flex-1 overflow-hidden">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">{children}</div>
        </main>
      </div>
    </div>
  );
}
