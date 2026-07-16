import { PublicHeader } from '@/components/public/public-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { Skeleton } from '@/components/ui/feedback/skeleton';

export function LegalPageSkeleton() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12 md:py-16">
        <AnimateIn className="space-y-8">
          <header className="space-y-4">
            <Skeleton className="h-4 w-44" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full max-w-xl md:h-14" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full max-w-3xl" />
                <Skeleton className="h-5 w-4/5 max-w-2xl" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
          </header>

          <div className="surface-shadow border-border bg-card/80 rounded-2xl border p-6 md:p-8">
            <div className="space-y-8">
              {Array.from({ length: 6 }).map((_, sectionIndex) => (
                <section key={sectionIndex} className="space-y-3">
                  <Skeleton className="h-7 w-64" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </AnimateIn>
      </main>
    </>
  );
}
