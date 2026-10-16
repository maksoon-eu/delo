import type { Metadata } from 'next';
import { LegalPage } from '@/features/legal/legal-page';
import { LEGAL_TERMS } from '@/constants/legal';
import { getPublicPageRobots } from '@/shared/utils/seo';

export const metadata: Metadata = {
  title: 'Условия использования | Delo',
  description: LEGAL_TERMS.description,
  alternates: { canonical: '/terms' },
  robots: getPublicPageRobots(),
};

export default function TermsPage() {
  return <LegalPage {...LEGAL_TERMS} />;
}
