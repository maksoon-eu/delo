import { cookies } from 'next/headers';
import { SIDEBAR_COOKIE_KEY } from '@/constants';
import { AppSidebar } from './sidebar';

export async function AppSidebarServer() {
  const cookieStore = await cookies();
  const defaultCollapsed = cookieStore.get(SIDEBAR_COOKIE_KEY)?.value === 'true';

  return <AppSidebar defaultCollapsed={defaultCollapsed} />;
}
