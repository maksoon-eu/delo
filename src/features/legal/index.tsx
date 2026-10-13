import { PublicHeader } from '@/features/order/common/ui/public-header';
import type { LegalDocument } from './types';
import { LegalPageView } from './ui/legal-page';

type LegalPageProps = LegalDocument;

export function LegalPage(props: LegalPageProps) {
  return (
    <>
      <PublicHeader />
      <LegalPageView {...props} />
    </>
  );
}
