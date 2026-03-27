'use client';

import { useTheme } from 'next-themes';
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
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const isReady = resolvedTheme !== undefined;
  const initials = getInitials(userName);

  return (
    <header className="border-border bg-background flex h-14 shrink-0 items-center justify-end gap-2 border-b px-4">
      {isReady && (
        <Button
          Icon={isDark ? SunIcon : MoonIcon}
          mode="icon"
          variant="ghost"
          tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
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
        variant="ghost"
        tooltip="Выйти"
        onClick={() => logoutUser()}
      />
    </header>
  );
}
