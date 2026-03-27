import { ComponentType, Ref } from 'react';

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export type NavItem = {
  href: string;
  label: string;
  Icon: ComponentType<{ size?: number; ref?: Ref<AnimatedIconHandle> }>;
};
