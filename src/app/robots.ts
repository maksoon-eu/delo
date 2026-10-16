import type { MetadataRoute } from 'next';
import { SEO_SITE_URL } from '@/shared/constants/seo';
import { isIndexableDeployment } from '@/shared/utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    ...(isIndexableDeployment() && { sitemap: `${SEO_SITE_URL}/sitemap.xml` }),
  };
}
