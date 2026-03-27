'use client';

import { useState, useCallback } from 'react';
import { COOKIE_STORAGE_MAX_AGE } from '@/constants';

export function useCookieStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  const setCookie = useCallback(
    (newValue: T) => {
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(newValue))}; path=/; max-age=${COOKIE_STORAGE_MAX_AGE}`;
      setValue(newValue);
    },
    [key]
  );

  return [value, setCookie];
}
