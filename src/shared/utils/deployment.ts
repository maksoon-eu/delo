import { env } from '@/shared/config/env';
import { SEO_SITE_URL } from '@/shared/constants/seo';

export function isProductionDeployment() {
  return (
    env.NODE_ENV === 'production' &&
    env.APP_ENV === 'prod' &&
    new URL(env.NEXT_PUBLIC_APP_URL).origin === SEO_SITE_URL
  );
}
