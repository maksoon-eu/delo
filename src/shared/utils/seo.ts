import { env } from '@/shared/config/env';
import { SEO_SITE_URL, SEO_PRIVATE_ROBOTS, SEO_PUBLIC_ROBOTS } from '@/shared/constants/seo';

export function isIndexableDeployment() {
  return env.APP_ENV === 'prod' && new URL(env.NEXT_PUBLIC_APP_URL).origin === SEO_SITE_URL;
}

export function getPublicPageRobots() {
  return isIndexableDeployment() ? SEO_PUBLIC_ROBOTS : SEO_PRIVATE_ROBOTS;
}
