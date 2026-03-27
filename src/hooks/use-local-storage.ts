'use client';

import { useCallback, useSyncExternalStore } from 'react';

function dispatchStorageEvent(key: string) {
  window.dispatchEvent(new StorageEvent('storage', { key }));
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const getSnapshot = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

  const setValue = useCallback(
    (newValue: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        dispatchStorageEvent(key);
      } catch {
        // ignore write errors
      }
    },
    [key]
  );

  return [value, setValue];
}
