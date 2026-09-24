import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';

export function useRouterNavigate() {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path as Route);
      router.refresh();
    },
    [router]
  );

  return { navigateTo };
}
