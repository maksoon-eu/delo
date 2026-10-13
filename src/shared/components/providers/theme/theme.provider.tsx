'use client';

import type { ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeAssets } from './theme-assets';

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  const { children, ...rest } = props;
  return (
    <NextThemesProvider {...rest}>
      <ThemeAssets />
      {children}
    </NextThemesProvider>
  );
}
