'use client';

import { useState } from 'react';

type UseInfiniteListParams<T> = {
  initialItems: T[];
  initialHasMore: boolean;
  fetch: (offset: number, take: number) => Promise<{ items: T[]; hasMore: boolean }>;
  pageSize: number;
};

type UseInfiniteListReturn<T> = {
  items: T[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => Promise<void>;
};

export function useInfiniteList<T>(params: UseInfiniteListParams<T>): UseInfiniteListReturn<T> {
  const { initialItems, initialHasMore, fetch, pageSize } = params;

  const [items, setItems] = useState<T[]>(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
