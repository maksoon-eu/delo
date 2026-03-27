'use client';

import { useState, useCallback } from 'react';

const MAX_AGE = 60 * 60 * 24 * 365;

export function useCookieStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  const setCookie = useCallback(
    (newValue: T) => {
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(newValue))}; path=/; max-age=${MAX_AGE}`;
      setValue(newValue);
    },
    [key]
  );

  return [value, setCookie];
}
