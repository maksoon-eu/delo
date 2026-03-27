import { clsx, type ClassValue } from 'clsx';
import type { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import type { AnimatedIconHandle } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function startAnimatedIcon(ref: RefObject<AnimatedIconHandle | null>, disabled?: boolean) {
  if (!disabled) ref.current?.startAnimation();
}

export function stopAnimatedIcon(ref: RefObject<AnimatedIconHandle | null>, disabled?: boolean) {
  if (!disabled) ref.current?.stopAnimation();
}

export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 1).toUpperCase();
}
