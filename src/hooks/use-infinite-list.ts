'use client';

import { useEffect, useRef, useState } from 'react';

type UseInfiniteListParams<T> = {
  initialItems: T[];
  initialHasMore: boolean;
  fetch: (offset: number, take: number) => Promise<{ items: T[]; hasMore: boolean }>;
  pageSize: number;
  deps?: unknown[];
};

type UseInfiniteListReturn<T> = {
  items: T[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => Promise<void>;
};

export function useInfiniteList<T>(params: UseInfiniteListParams<T>): UseInfiniteListReturn<T> {
  const { initialItems, initialHasMore, fetch, pageSize, deps = [] } = params;

  const didDepsChange = useRef(false);

  const [items, setItems] = useState<T[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!didDepsChange.current) {
      didDepsChange.current = true;
      return;
    }

    if (isLoadingMore) return;

    async function reset() {
      setIsLoadingMore(true);

      const result = await fetch(0, pageSize);
      setItems(result.items);
      setHasMore(result.hasMore);

      setIsLoadingMore(false);
    }

    reset();
  }, deps);

  async function loadMore() {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    const result = await fetch(items.length, pageSize);
    setItems((prev) => [...prev, ...result.items]);
    setHasMore(result.hasMore);

    setIsLoadingMore(false);
  }

  return { items, hasMore, isLoadingMore, loadMore };
}
