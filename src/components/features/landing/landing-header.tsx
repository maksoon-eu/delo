'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/actions/button';
import { SunIcon } from '@/components/icons/sun';
import { MoonIcon } from '@/components/icons/moon';
import { useIsClient } from '@/hooks/use-is-client';
import { useThemeToggle } from '@/hooks/use-theme-toggle';
import { ROOT_ROUTE } from '@/constants/routes';
import { LANDING_NAV_ITEMS } from '@/constants/landing';

export function LandingHeader() {
  const { isDark, toggleTheme } = useThemeToggle();
  const isClient = useIsClient();

  return (
    <header className="border-border bg-background/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <div className="landing-section mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-8">
        <Link href={ROOT_ROUTE} className="flex shrink-0 items-center gap-3">
          <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-[11px] text-xl font-extrabold">
            D
          </span>
          <span className="font-display text-foreground text-[22px] font-extrabold tracking-tight">
            Delo
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Навигация по лендингу">
          {LANDING_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isClient && (
            <Button
              Icon={isDark ? SunIcon : MoonIcon}
              mode="icon"
              variant="outline"
              tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
              onClick={toggleTheme}
            />
          )}
          <Button
            render={<Link href="/register" />}
            nativeButton={false}
            className="rounded-full px-5 text-sm font-bold"
          >
            Начать
          </Button>
        </div>
      </div>
    </header>
  );
}
