import type { LegalSection } from '../types';

type LegalContentsProps = {
  sections: LegalSection[];
};

export function LegalContents(props: LegalContentsProps) {
  const { sections } = props;

  return (
    <nav
      aria-label="Оглавление документа"
      className="border-border border-b pb-8 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:border-b-0 lg:pb-1 lg:pr-4"
    >
      <ol className="grid gap-1 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
        {sections.map((section, index) => (
          <li key={section.title}>
            <a
              href={`#legal-section-${index + 1}`}
              className="text-muted-foreground hover:text-primary focus-visible:outline-ring block rounded-sm py-2 text-sm leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
