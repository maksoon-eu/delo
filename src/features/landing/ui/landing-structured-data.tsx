import { LANDING_STRUCTURED_DATA } from '@/features/landing/constants';

export function LandingStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(LANDING_STRUCTURED_DATA).replace(/</g, '\\u003c'),
      }}
    />
  );
}
