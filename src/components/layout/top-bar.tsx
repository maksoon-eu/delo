'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { Route } from 'next';
import { useIsClient } from '@/hooks/use-is-client';
import { useAsyncAction } from '@/hooks/use-async-action';
import { Button } from '@/components/ui/actions/button';
import { PageHeader } from '@/components/layout/page-header';
import { SunIcon } from '@/components/icons/sun';
import { MoonIcon } from '@/components/icons/moon';
import { LogoutIcon } from '@/components/icons/logout';
import { logoutUser } from '@/actions/auth';
import { getInitials, getProfileImageUrl } from '@/utils/profile';

type TopBarProps = {
  userName: string;
  userImage: string | null;
};

export function TopBar(props: TopBarProps) {
  const { userName, userImage } = props;
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const isDark = resolvedTheme === 'dark';
  const initials = getInitials(userName);
  const userImageUrl = getProfileImageUrl(userImage);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
    router.refresh();
  }

  const [executeLogout, isLoggingOut] = useAsyncAction(handleLogout);

  return (
    <header className="surface-shadow bg-sidebar border-sidebar-border relative flex min-h-16 shrink-0 items-center justify-between gap-4 rounded-2xl border px-4 py-3 sm:px-5">
      <PageHeader />
      <div className="flex shrink-0 items-center justify-end gap-3">
        {isClient && (
          <Button
            Icon={isDark ? SunIcon : MoonIcon}
            mode="icon"
            variant="outline"
            tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
            onClick={toggleTheme}
          />
        )}
        <Link
          href={'/profile' as Route}
          className="hover:bg-muted flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="hidden flex-col items-end leading-none sm:flex">
            <span className="text-foreground text-sm font-semibold">{userName}</span>
          </div>
          <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold">
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt={userName}
                width={40}
                height={40}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
        </Link>
        <Button
          Icon={LogoutIcon}
          mode="icon"
          variant="outline"
          tooltip="Выйти"
          isLoading={isLoggingOut}
          onClick={executeLogout}
        />
      </div>
    </header>
  );
}
