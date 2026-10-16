import { LegalHeader } from './ui/legal-header';
import type { LegalDocument } from './types';
import { LegalPageView } from './ui/legal-page';

type LegalPageProps = LegalDocument;

export function LegalPage(props: LegalPageProps) {
  return (
    <div className="bg-background text-foreground flex flex-1 flex-col font-sans">
      <a
        href="#legal-main"
        className="bg-surface text-foreground border-border sr-only z-50 rounded-lg border p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к документу
      </a>
      <LegalHeader />
      <LegalPageView {...props} />
    </div>
  );
}
