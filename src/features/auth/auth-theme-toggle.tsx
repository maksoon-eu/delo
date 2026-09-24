'use client';

import { Button } from '@/shared/components/ui/actions/button';
import { MoonIcon } from '@/shared/components/icons/moon';
import { SunIcon } from '@/shared/components/icons/sun';
import { useIsClient } from '@/shared/hooks/use-is-client';
import { useThemeToggle } from '@/shared/hooks/use-theme-toggle';

export function AuthThemeToggle() {
  const isClient = useIsClient();
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <Button
      type="button"
      mode="icon"
      variant="outline"
      Icon={isClient && isDark ? SunIcon : MoonIcon}
      tooltip={isClient && isDark ? 'Светлая тема' : 'Тёмная тема'}
      onClick={toggleTheme}
      className="border-border bg-surface/80 text-foreground rounded-full"
    />
  );
}
