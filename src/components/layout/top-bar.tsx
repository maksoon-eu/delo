'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useIsClient } from '@/hooks/use-is-client';
import { useAsyncAction } from '@/hooks/use-async-action';
import { Button } from '@/components/ui/actions/button';
import { SunIcon } from '@/components/icons/sun';
import { MoonIcon } from '@/components/icons/moon';
import { LogoutIcon } from '@/components/icons/logout';
import { logoutUser } from '@/actions/auth';
import { getInitials } from '@/lib/utils';

type TopBarProps = {
  userName: string;
};

export function TopBar(props: TopBarProps) {
  const { userName } = props;
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const isDark = resolvedTheme === 'dark';
  const initials = getInitials(userName);

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
      <div className="flex items-center gap-2 px-1">
        <div className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
          {initials}
        </div>
        <span className="text-foreground text-sm font-medium">{userName}</span>
      </div>
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
