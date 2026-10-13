'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/actions/button';
import { SunIcon } from '@/shared/components/icons/sun';
import { MoonIcon } from '@/shared/components/icons/moon';
import { useIsClient } from '@/shared/hooks/use-is-client';
import { useThemeToggle } from '@/shared/hooks/use-theme-toggle';
import { LANDING_NAV_ITEMS } from '@/features/landing/constants';
import { BrandLogo } from '@/shared/components/layout/brand-logo';

export function LandingHeader() {
  const { isDark, toggleTheme } = useThemeToggle();
  const isClient = useIsClient();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleToggleMenu() {
    setMenuOpen((open) => !open);
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="bg-background/95 sticky top-0 z-30 backdrop-blur-lg">
      <div className="h-18 relative mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href="/"
          aria-label="Delo — главная"
          className="focus-visible:outline-ring flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <BrandLogo className="h-9" />
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex"
          aria-label="Навигация по лендингу"
        >
          {LANDING_NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="landing-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isClient && (
            <Button
              Icon={isDark ? SunIcon : MoonIcon}
              mode="icon"
              variant="ghost"
              className="size-10 motion-reduce:transform-none"
              tooltip={isDark ? 'Светлая тема' : 'Тёмная тема'}
              onClick={toggleTheme}
            />
          )}
          <Link href="/login" className="landing-nav-link hidden sm:inline-flex">
            Войти
          </Link>
          <Button
            render={<Link href="/register" />}
            nativeButton={false}
            className="hidden h-11 rounded-lg px-5 text-sm motion-reduce:transform-none sm:inline-flex"
          >
            Создать аккаунт
          </Button>
          <Button
            variant="outline"
            className="h-10 px-4 text-sm motion-reduce:transform-none lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="landing-mobile-nav"
            onClick={handleToggleMenu}
          >
            {menuOpen ? 'Закрыть' : 'Меню'}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="landing-mobile-nav"
          aria-label="Мобильная навигация"
          className="landing-section border-border flex flex-col gap-1 border-t py-4 lg:hidden"
        >
          {LANDING_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleCloseMenu}
              className="landing-nav-link rounded-lg py-3"
            >
              {item.label}
            </a>
          ))}
          <div className="border-border mt-2 flex items-center justify-between gap-3 border-t pt-4">
            <Link href="/login" className="landing-nav-link py-3" onClick={handleCloseMenu}>
              Войти
            </Link>
            <Button
              render={<Link href="/register" />}
              nativeButton={false}
              className="h-11 px-5 text-sm"
            >
              Создать аккаунт
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
