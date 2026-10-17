import type { MetadataRoute } from 'next';
import { SEO_PUBLIC_PATHS, SEO_SITE_URL } from '@/shared/constants/seo';
import { isProductionDeployment } from '@/shared/utils/deployment';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDeployment()) return [];

  return SEO_PUBLIC_PATHS.map((path) => ({
    url: new URL(path, SEO_SITE_URL).href,
  }));
}
