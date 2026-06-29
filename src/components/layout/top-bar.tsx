'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { Route } from 'next';
import { useIsClient } from '@/hooks/use-is-client';
import { useAsyncAction } from '@/hooks/use-async-action';
import { Button } from '@/components/ui/actions/button';
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
    <header className="glass border-border relative flex h-14 shrink-0 items-center justify-end gap-2 border-b px-4">
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
        className="hover:bg-muted flex items-center gap-2 rounded-lg px-2 py-1 transition-colors"
      >
        <div className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold">
          {userImageUrl ? (
            <Image
              src={userImageUrl}
              alt={userName}
              width={28}
              height={28}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <span className="text-foreground text-sm font-medium">{userName}</span>
      </Link>
      <Button
        Icon={LogoutIcon}
        mode="icon"
        variant="outline"
        tooltip="Выйти"
        isLoading={isLoggingOut}
        onClick={executeLogout}
      />
    </header>
  );
}
