import { AnimateIn } from "@/components/ui/feedback/animate-in";
import { Skeleton } from '@/components/ui/feedback/skeleton';

export default function ClientLoading() {
  return (
    <AnimateIn className="space-y-6">
      <div className="glass border-accent/50 mb-8 rounded-xl border px-4 py-3 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="glass flex flex-col gap-6 rounded-xl border p-5 shadow-sm">
        <Skeleton className="h-4 w-24" />

        <div className="flex items-center gap-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-6" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
