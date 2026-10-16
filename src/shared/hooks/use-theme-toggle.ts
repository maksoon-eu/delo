'use client';

import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { THEME_TRANSITION_CLASS, THEME_TRANSITION_OPTIONS } from '@/shared/constants/theme';

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  async function changeTheme(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const nextTheme = isDark ? 'light' : 'dark';

    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add(THEME_TRANSITION_CLASS);
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    try {
      await transition.ready;
      await root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        THEME_TRANSITION_OPTIONS
      ).finished;
      await transition.finished;
    } catch {
      transition.skipTransition();
    } finally {
      root.classList.remove(THEME_TRANSITION_CLASS);
    }
  }

  const [toggleTheme, isSwitching] = useAsyncAction(changeTheme);

  return { isDark, toggleTheme, isSwitching };
}
