'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { AUTH_PANEL_BY_SEGMENT } from '@/shared/constants/auth';
import type { AuthPanelSegment } from '@/shared/types/auth';

type AuthLayoutContentProps = {
  children: ReactNode;
};

export function AuthLayoutContent(props: AuthLayoutContentProps) {
  const { children } = props;
  const segment = useSelectedLayoutSegment();
  const panelSegment: AuthPanelSegment =
    segment && segment in AUTH_PANEL_BY_SEGMENT ? (segment as AuthPanelSegment) : 'login';
  const { title, description } = AUTH_PANEL_BY_SEGMENT[panelSegment];

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm leading-6 sm:text-base">{description}</p>
      </div>

      <AnimateIn key={panelSegment}>{children}</AnimateIn>

      {panelSegment === 'login' ? (
        <p className="text-muted-foreground text-center text-sm">
          Ещё нет аккаунта?{' '}
          <Link
            href="/register"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      ) : (
        <p className="text-muted-foreground text-center text-sm">
          {panelSegment === 'register' ? 'Уже есть аккаунт? ' : ''}
          <Link
            href="/login"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            {panelSegment === 'register' ? 'Войти' : 'Вернуться ко входу'}
          </Link>
        </p>
      )}
    </div>
  );
}
