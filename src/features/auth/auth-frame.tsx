import type { ReactNode } from 'react';
import Link from 'next/link';
import { AuthDotMatrix } from '@/features/auth/auth-dot-matrix';
import { AuthThemeToggle } from '@/features/auth/auth-theme-toggle';
import { ROOT_ROUTE } from '@/shared/constants/routes';

type AuthFrameProps = {
  children: ReactNode;
};

export function AuthFrame(props: AuthFrameProps) {
  const { children } = props;

  return (
    <main className="bg-surface text-foreground relative isolate min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <AuthDotMatrix />
      </div>
      <section className="xl:px-18 relative z-10 flex min-h-dvh flex-col justify-center px-6 py-7 sm:px-10 sm:py-10 lg:w-[47%] lg:px-14 lg:py-12">
        <div className="glass border-glass border-primary/25 bg-linear-to-br from-primary/20 via-accent/15 to-card/75 mx-auto flex w-full max-w-[500px] flex-col rounded-3xl border px-6 py-7 sm:px-9 sm:py-9 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={ROOT_ROUTE}
              className="flex items-center gap-2.5"
              aria-label="Delo — главная"
            >
              <span className="bg-primary text-primary-foreground grid size-10 place-items-center rounded-xl text-xl font-extrabold">
                D
              </span>
              <span className="font-display text-foreground text-2xl font-extrabold tracking-tight">
                Delo
              </span>
            </Link>
            <AuthThemeToggle />
          </div>

          <div className="w-full pb-1 pt-10 sm:pt-12">{children}</div>
        </div>
      </section>
    </main>
  );
}
