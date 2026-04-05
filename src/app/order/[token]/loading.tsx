import { ContentCard } from '@/components/ui/data/content-card';
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function PublicOrderLoading() {
  return (
    <ContentCard className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-20 rounded-sm" />
        </div>
        <ContentCard className="bg-card grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </ContentCard>
      </div>

      <ContentCard className="bg-card">
        <Skeleton className="mb-4 h-5 w-28" />
        <div className="space-y-0">
          <div className="mb-2 grid grid-cols-[1fr_auto] gap-x-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="divide-border divide-y">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-x-4 py-3">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16 self-center" />
              </div>
            ))}
          </div>
          <div className="border-border mt-2 flex justify-between border-t pt-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </ContentCard>

      <ContentCard className="bg-card">
        <Skeleton className="mb-4 h-5 w-16" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>
      </ContentCard>
    </ContentCard>
  );
}
