'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import type { AuthPanelContent, AuthPanelSegment } from '../types';

type AuthLayoutViewProps = AuthPanelContent & {
  children: ReactNode;
  panelSegment: AuthPanelSegment;
};

export function AuthLayoutView(props: AuthLayoutViewProps) {
  const { children, panelSegment, title, description } = props;

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
