import type { Metadata } from 'next';
import { LegalPage } from '@/features/legal/legal-page';
import { LEGAL_PRIVACY } from '@/constants/legal';
import { getPublicPageRobots } from '@/shared/utils/seo';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных | Delo',
  description: LEGAL_PRIVACY.description,
  alternates: { canonical: '/privacy' },
  robots: getPublicPageRobots(),
};

export default function PrivacyPage() {
  return <LegalPage {...LEGAL_PRIVACY} />;
}
