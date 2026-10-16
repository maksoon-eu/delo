import type { Variants } from 'motion/react';

export const LANDING_REVEAL_VIEWPORT = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -32px 0px',
} as const;

export const LANDING_REVEAL_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

export const LANDING_PREVIEW_GROUP: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.45 } },
};

export const LANDING_REVEAL_VARIANTS = {
  default: {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.05, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  headline: {
    hidden: { opacity: 0, y: 44, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(-20% -10% -35% -10%)',
      transition: { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  visual: {
    hidden: { opacity: 0, y: 72, scale: 0.92, rotate: 1.2 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 1.4, ease: [0.22, 0.61, 0.36, 1] },
    },
  },
  decoration: {
    hidden: { opacity: 0, y: 36, scale: 0.82 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.35, ease: [0.22, 1.1, 0.36, 1] },
    },
  },
  accent: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 1.2, delay: 0.55, ease: [0.65, 0, 0.35, 1] },
    },
  },
} satisfies Record<string, Variants>;
