import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { PublicHeader } from '@/components/features/order/public-header';
import type { LegalSection } from '@/constants/legal';

type LegalPageProps = {
  title: string;
  description: string;
  version: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPage(props: LegalPageProps) {
  const { title, description, version, updatedAt, sections } = props;

  return (
    <>
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-12 md:py-16">
        <AnimateIn className="space-y-8">
          <header className="space-y-4">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              Правовая информация
            </p>
            <div className="space-y-3">
              <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-muted-foreground max-w-3xl text-base leading-7 md:text-lg">
                {description}
              </p>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <span>Редакция: {version}</span>
              <span>Обновлено: {updatedAt}</span>
            </div>
          </header>

          <div className="surface-shadow border-border bg-card/80 rounded-2xl border p-6 md:p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h2 className="text-foreground text-xl font-semibold">{section.title}</h2>
                  <div className="text-muted-foreground space-y-3 text-sm leading-7 md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
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
