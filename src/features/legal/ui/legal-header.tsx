'use client';

import Link from 'next/link';
import { BrandLogo } from '@/shared/components/layout/brand-logo';
import { Button } from '@/shared/components/ui/actions/button';
import { SunIcon } from '@/shared/components/icons/sun';
import { MoonIcon } from '@/shared/components/icons/moon';
import { useIsClient } from '@/shared/hooks/use-is-client';
import { useThemeToggle } from '@/shared/hooks/use-theme-toggle';
import { LOGIN_ROUTE, ROOT_ROUTE } from '@/shared/constants/routes';

export function LegalHeader() {
  const { isDark, toggleTheme } = useThemeToggle();
  const isClient = useIsClient();

  return (
    <header className="bg-background/95 sticky top-0 z-30 backdrop-blur-lg">
      <div className="h-18 mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link
          href={ROOT_ROUTE}
          aria-label="Delo — главная"
          className="focus-visible:outline-ring shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <BrandLogo className="h-8 sm:h-9" />
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-3 sm:gap-6">
          <Link href={ROOT_ROUTE} className="landing-nav-link">
            Главная
          </Link>
          <Link href={LOGIN_ROUTE} className="landing-nav-link">
            Войти
          </Link>
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
        </nav>
      </div>
    </header>
  );
}
