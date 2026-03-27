import type { ComponentType, Ref } from 'react';

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export type AnimatedIconComponent = ComponentType<{
  size?: number;
  ref?: Ref<AnimatedIconHandle>;
}>;

export type NavItem = {
  href: string;
  label: string;
  Icon: AnimatedIconComponent;
};
