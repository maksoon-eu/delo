import type { MetadataRoute } from 'next';
import { SEO_SITE_URL } from '@/shared/constants/seo';
import { isProductionDeployment } from '@/shared/utils/deployment';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    ...(isProductionDeployment() && { sitemap: `${SEO_SITE_URL}/sitemap.xml` }),
  };
}
