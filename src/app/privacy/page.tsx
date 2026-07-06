import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/legal-page';
import { LEGAL_PRIVACY } from '@/constants/legal';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных | Delo',
  description: LEGAL_PRIVACY.description,
};

export default function PrivacyPage() {
  return <LegalPage {...LEGAL_PRIVACY} />;
}
