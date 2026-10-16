'use client';

import type { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { AUTH_PANEL_BY_SEGMENT } from './constants';
import type { AuthPanelSegment } from './types';
import { AuthLayoutView } from './ui/auth-layout-view';

type AuthLayoutContentProps = { children: ReactNode };

export function AuthLayoutContent(props: AuthLayoutContentProps) {
  const { children } = props;
  const segment = useSelectedLayoutSegment();
  const panelSegment: AuthPanelSegment =
    segment && segment in AUTH_PANEL_BY_SEGMENT ? (segment as AuthPanelSegment) : 'login';
  const { title, description } = AUTH_PANEL_BY_SEGMENT[panelSegment];

  return (
    <AuthLayoutView panelSegment={panelSegment} title={title} description={description}>
      {children}
    </AuthLayoutView>
  );
}
