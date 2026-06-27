import { ContentCard } from '@/components/ui/data/content-card';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function ProfileLoading() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <div className="glass border-accent/50 mb-8 rounded-xl border px-4 py-3 ">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-7 w-28" />
        </div>
        <Skeleton className="h-4 w-60" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <ContentCard className="space-y-5">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-36 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </ContentCard>

        <div className="space-y-5">
          <ContentCard>
            <Skeleton className="mb-4 h-5 w-16" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-5 w-44" />
                </div>
              ))}
            </div>
            <Skeleton className="mt-5 h-10 w-full" />
          </ContentCard>

          <ContentCard>
            <Skeleton className="mb-4 h-5 w-20" />
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-5 w-36" />
            </div>
          </ContentCard>
        </div>
      </div>
    </AnimateIn>
  );
}
