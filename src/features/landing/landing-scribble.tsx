import { LANDING_SCRIBBLES } from '@/shared/constants/landing';
import { cn } from '@/shared/utils/cn';

type LandingScribbleProps = {
  variant: keyof typeof LANDING_SCRIBBLES;
  className?: string;
};

export function LandingScribble(props: LandingScribbleProps) {
  const { variant, className } = props;
  const scribble = LANDING_SCRIBBLES[variant];
  return (
    <svg
      aria-hidden
      viewBox={scribble.viewBox}
      fill="none"
      className={cn('text-primary pointer-events-none', className)}
    >
      <path
        d={scribble.path}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
