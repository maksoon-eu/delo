import type { Metadata } from 'next';
import { LegalPage } from '@/features/legal';
import { LEGAL_PRIVACY } from '@/features/legal/constants';
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
