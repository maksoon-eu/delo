import * as motion from 'motion/react-client';
import { LANDING_SCRIBBLES, LANDING_REVEAL_VARIANTS } from '@/features/landing/constants';
import { cn } from '@/shared/utils/cn';

type LandingScribbleProps = {
  variant: keyof typeof LANDING_SCRIBBLES;
  className?: string;
  reveal?: boolean;
};

export function LandingScribble(props: LandingScribbleProps) {
  const { variant, className, reveal = false } = props;
  const scribble = LANDING_SCRIBBLES[variant];
  const Svg = reveal ? motion.svg : 'svg';

  return (
    <Svg
      aria-hidden
      variants={reveal ? LANDING_REVEAL_VARIANTS.accent : undefined}
      viewBox={scribble.viewBox}
      fill="none"
      className={cn('text-primary pointer-events-none', reveal && 'landing-reveal', className)}
    >
      <path
        d={scribble.path}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
