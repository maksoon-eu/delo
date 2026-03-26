import { cn } from '@/lib/utils';

const variants = {
  fade: 'animate-in fade-in-0 duration-300',
  'slide-up': 'animate-in fade-in-0 slide-in-from-bottom-4 duration-300',
  'slide-down': 'animate-in fade-in-0 slide-in-from-top-4 duration-300',
  zoom: 'animate-in fade-in-0 zoom-in-95 duration-200',
} as const;

type Variant = keyof typeof variants;

type AnimateInProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function AnimateIn(props: AnimateInProps) {
  const { variant = 'slide-up', className, children } = props;
  return <div className={cn(variants[variant], className)}>{children}</div>;
}
