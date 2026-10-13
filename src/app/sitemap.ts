import type { MetadataRoute } from 'next';
import { SEO_PUBLIC_PATHS, SEO_SITE_URL } from '@/shared/constants/seo';
import { isIndexableDeployment } from '@/shared/utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];

  return SEO_PUBLIC_PATHS.map((path) => ({
    url: new URL(path, SEO_SITE_URL).href,
  }));
}
