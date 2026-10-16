'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeAssets() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const icons = document.querySelectorAll<HTMLLinkElement>(
      'link[rel~="icon"][href^="/favicons/"]'
    );
    const appleIcons = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="apple-touch-icon"][href^="/favicons/"]'
    );

    for (const icon of [...icons, ...appleIcons]) {
      icon.media = icon.getAttribute('href')?.startsWith(`/favicons/${resolvedTheme}/`)
        ? 'all'
        : 'not all';
    }

    const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (manifest) manifest.href = `/favicons/${resolvedTheme}/manifest.webmanifest`;
  }, [resolvedTheme]);

  return null;
}
