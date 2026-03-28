import type { Route } from 'next';
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
  href: Route;
  label: string;
  description: string;
  Icon: AnimatedIconComponent;
};
