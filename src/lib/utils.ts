import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
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

export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  });
}

export function formatDate(date: Date, fmt = 'd MMM yyyy'): string {
  return format(date, fmt, { locale: ru });
}

export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 1).toUpperCase();
}

export function requiredAmount(
  requiredMessage: string,
  minMessage: string,
  integerMessage: string
) {
  return z
    .union([z.number(), z.string(), z.null(), z.undefined()])
    .refine((value) => value !== '' && value != null, requiredMessage)
    .pipe(
      z.coerce
        .number<string | number | null | undefined>({ error: requiredMessage })
        .int(integerMessage)
        .min(1, minMessage)
    );
}
