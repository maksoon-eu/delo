import { SEO_PRIVATE_ROBOTS, SEO_PUBLIC_ROBOTS } from '@/shared/constants/seo';
import { isProductionDeployment } from '@/shared/utils/deployment';

export function getPublicPageRobots() {
  return isProductionDeployment() ? SEO_PUBLIC_ROBOTS : SEO_PRIVATE_ROBOTS;
}
