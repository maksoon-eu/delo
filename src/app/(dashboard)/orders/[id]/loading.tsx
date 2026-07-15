import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ContentCard } from '@/components/ui/data/content-card';
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function OrderLoading() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <div className="space-y-6">
        <div className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-7 w-28 rounded-lg" />
          </div>
        </div>

        <section>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-3 w-20" />
          <div className="mt-3 flex flex-wrap gap-4">
            <Skeleton className="h-18.75 sm:w-50 w-full rounded-xl" />
            <Skeleton className="h-18.75 w-full rounded-xl sm:w-60" />
          </div>
        </section>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <ContentCard variant="solid" className="h-88 overflow-hidden">
            <Skeleton className="mb-5 h-5 w-28" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard variant="solid" className="h-88 overflow-hidden">
            <div className="mb-5 flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <div className="space-y-5">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="ml-auto h-3 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </ContentCard>

          <ContentCard variant="solid" className="h-80 overflow-hidden">
            <Skeleton className="mb-4 h-5 w-28" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard variant="solid" className="h-80 overflow-hidden">
            <Skeleton className="mb-5 h-5 w-20" />
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>
      </div>
    </AnimateIn>
  );
}
