import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true, // на клиенте
    () => false // на сервере (snapshot для SSR)
  );
}
