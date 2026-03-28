'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export function useAsyncAction<TArgs extends unknown[]>(fn: (...args: TArgs) => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      try {
        await fn(...args);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Произошла непредвиденная ошибка');
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  return [execute, isLoading] as const;
}
