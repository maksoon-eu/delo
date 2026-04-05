'use client';

import { useTheme } from 'next-themes';
import { useIsClient } from '@/hooks/use-is-client';
import { Button } from '@/components/ui/actions/button';
import { SunIcon } from '@/components/icons/sun';
import { MoonIcon } from '@/components/icons/moon';

export function PublicHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="glass border-border relative flex h-14 shrink-0 items-center justify-between border-b px-6">
      <span className="text-foreground text-base font-semibold tracking-tight">Дело</span>
      {isClient && (
        <Button
          Icon={isDark ? SunIcon : MoonIcon}
          mode="icon"
          variant="outline"
          tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
          onClick={toggleTheme}
        />
      )}
    </header>
  );
}
