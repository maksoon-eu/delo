import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function OrderLoading() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <div className="glass border-accent/50 mb-8 rounded-xl border px-4 py-3 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-7 w-64" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-5">
        <div className="glass rounded-xl border p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="glass rounded-xl border p-5 shadow-sm">
              <Skeleton className="mb-4 h-5 w-28" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-3.5 w-20" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl border p-5 shadow-sm">
              <Skeleton className="mb-4 h-5 w-28" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border p-5 shadow-sm">
            <Skeleton className="mb-4 h-5 w-20" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="mt-1.5 size-2 shrink-0 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
