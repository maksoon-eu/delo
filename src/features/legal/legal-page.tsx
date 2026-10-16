import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';
import { LandingScribble } from '@/features/landing/landing-scribble';
import { LegalHeader } from '@/features/legal/legal-header';
import { LegalContents } from '@/features/legal/legal-contents';
import type { LegalSection } from '@/shared/constants/legal';

type LegalPageProps = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export function LegalPage(props: LegalPageProps) {
  const { title, description, sections } = props;

  return (
    <div className="bg-background text-foreground flex flex-1 flex-col font-sans">
      <a
        href="#legal-main"
        className="bg-surface text-foreground border-border sr-only z-50 rounded-lg border p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к документу
      </a>
      <LegalHeader />
      <main
        id="legal-main"
        tabIndex={-1}
        className="landing-section flex-1 pb-20 pt-12 sm:pb-28 sm:pt-20"
      >
        <AnimateIn className="motion-reduce:animate-none">
          <header className="border-border border-b pb-8 sm:pb-10">
            <div className="max-w-4xl">
              <h1 className="text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1.1] tracking-[-0.045em]">
                {title}
              </h1>
              <LandingScribble variant="underline" className="mt-3 h-4 w-36 sm:h-5 sm:w-48" />
              <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
                {description}
              </p>
            </div>
          </header>

          <div className="grid items-start gap-10 pt-8 sm:pt-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <LegalContents sections={sections} />
            <article aria-label={title} className="min-w-0 max-w-3xl">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={`legal-section-${index + 1}`}
                  aria-labelledby={`legal-heading-${index + 1}`}
                  className="border-border scroll-mt-28 border-b py-8 first:pt-0 last:border-b-0 last:pb-0 sm:py-10"
                >
                  <h2
                    id={`legal-heading-${index + 1}`}
                    className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground mt-5 space-y-4 text-base leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </AnimateIn>
      </main>
    </div>
  );
}
