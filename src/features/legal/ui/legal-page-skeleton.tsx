import { LegalHeader } from './legal-header';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { Skeleton } from '@/shared/components/ui/feedback/skeleton';

export function LegalPageSkeleton() {
  return (
    <div className="bg-background text-foreground flex flex-1 flex-col font-sans">
      <LegalHeader />
      <main
        aria-busy="true"
        aria-label="Загрузка правового документа"
        className="landing-section flex-1 pb-20 pt-12 sm:pb-28 sm:pt-20"
      >
        <AnimateIn className="motion-reduce:animate-none">
          <header className="border-border border-b pb-8 sm:pb-10">
            <div className="max-w-4xl">
              <Skeleton className="sm:h-18 h-12 w-full max-w-2xl" />
              <Skeleton className="mt-3 h-4 w-36 sm:h-5 sm:w-48" />
              <div className="mt-6 space-y-3">
                <Skeleton className="h-5 w-full max-w-2xl" />
                <Skeleton className="h-5 w-4/5 max-w-xl" />
              </div>
            </div>
          </header>

          <div className="grid items-start gap-10 pt-8 sm:pt-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <div aria-hidden className="border-border border-b pb-8 lg:border-b-0 lg:pb-0">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {Array.from({ length: 9 }).map((_, index) => (
                  <Skeleton key={index} className="h-5 w-full max-w-52" />
                ))}
              </div>
            </div>
            <div aria-hidden className="min-w-0 max-w-3xl">
              {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="border-border space-y-5 border-b py-8 first:pt-0 last:border-b-0 sm:py-10"
                >
                  <Skeleton className="h-7 w-3/4 max-w-80" />
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </main>
    </div>
  );
}
