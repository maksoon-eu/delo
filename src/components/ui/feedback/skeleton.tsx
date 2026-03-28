import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

export function Skeleton(props: SkeletonProps) {
  const { className } = props;
  return <div className={cn('bg-foreground/10 animate-pulse rounded-md', className)} />;
}
