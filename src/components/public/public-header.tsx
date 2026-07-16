'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useIsClient } from '@/hooks/use-is-client';
import { Button } from '@/components/ui/actions/button';
import { LockKeyholeIcon } from '@/components/icons/lock-keyhole';
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
    <header className="surface-shadow border-border bg-background shrink-0 border-b">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold">
            Д
          </span>
          <span className="text-foreground text-base font-semibold tracking-tight">Дело</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/login" />}
            nativeButton={false}
            Icon={LockKeyholeIcon}
            mode="icon"
            variant="outline"
            tooltip="Войти"
          />
          {isClient && (
            <Button
              Icon={isDark ? SunIcon : MoonIcon}
              mode="icon"
              variant="outline"
              tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
              onClick={toggleTheme}
            />
          )}
        </div>
      </div>
    </header>
  );
}
