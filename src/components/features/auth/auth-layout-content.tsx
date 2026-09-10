'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { AUTH_PANEL_BY_SEGMENT, AUTH_TABS } from '@/constants/auth';
import type { AuthPanelSegment } from '@/types/auth';
import { cn } from '@/utils/cn';

type AuthLayoutContentProps = {
  children: ReactNode;
};

export function AuthLayoutContent(props: AuthLayoutContentProps) {
  const { children } = props;
  const segment = useSelectedLayoutSegment();
  const panelSegment: AuthPanelSegment =
    segment && segment in AUTH_PANEL_BY_SEGMENT ? (segment as AuthPanelSegment) : 'login';
  const panelContent = AUTH_PANEL_BY_SEGMENT[panelSegment];
  const { activeTab, title, description } = panelContent;

  return (
    <div className="lg:min-h-189 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-foreground text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>

      <nav
        className="border-border relative grid w-full grid-cols-2 border-b"
        aria-label="Auth navigation"
      >
        {AUTH_TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'pb-3 text-center text-sm font-semibold transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
        <span
          className={cn(
            'bg-primary absolute bottom-0 left-0 h-0.5 w-1/2 rounded-full transition-transform duration-300 ease-out',
            activeTab === 'register' && 'translate-x-full',
            activeTab === null && 'opacity-0'
          )}
        />
      </nav>

      <AnimateIn key={panelSegment}>{children}</AnimateIn>
    </div>
  );
}
