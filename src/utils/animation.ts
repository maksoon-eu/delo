import type { RefObject } from 'react';
import type { AnimatedIconHandle } from '@/types/icons';

export function startAnimatedIcon(ref: RefObject<AnimatedIconHandle | null>, disabled?: boolean) {
  if (!disabled) ref.current?.startAnimation();
}

export function stopAnimatedIcon(ref: RefObject<AnimatedIconHandle | null>, disabled?: boolean) {
  if (!disabled) ref.current?.stopAnimation();
}
