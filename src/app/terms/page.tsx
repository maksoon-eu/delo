import type { Metadata } from 'next';
import { LegalPage } from '@/features/legal';
import { LEGAL_TERMS } from '@/features/legal/constants';
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
