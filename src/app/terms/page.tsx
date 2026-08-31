import type { Metadata } from 'next';
import { LegalPage } from '@/components/features/legal/legal-page';
import { LEGAL_TERMS } from '@/constants/legal';

export const metadata: Metadata = {
  title: 'Условия использования | Delo',
  description: LEGAL_TERMS.description,
};

export default function TermsPage() {
  return <LegalPage {...LEGAL_TERMS} />;
}
