import { AnimateIn } from "@/components/ui/feedback/animate-in";
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function ClientsLoading() {
  return (
    <AnimateIn>
      <div className="glass border-accent/50 mb-8 rounded-xl border px-4 py-3 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-7 w-32" />
        </div>
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 max-w-sm flex-1" />
          <Skeleton className="h-9 w-36" />
        </div>

        <div className="rounded-lg border">
          <div className="border-b px-4 py-3">
            <div className="flex gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b px-4 py-3 last:border-0">
              <div className="flex items-center gap-6">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-24" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
