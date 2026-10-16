import type { Metadata } from 'next';
import { LandingContent } from '@/features/landing';
import {
  SEO_TITLE,
  SEO_DESCRIPTION,
  SEO_SITE_URL,
  SEO_SITE_NAME,
  SEO_SOCIAL_IMAGE,
} from '@/shared/constants/seo';
import { getPublicPageRobots } from '@/shared/utils/seo';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  alternates: { canonical: '/' },
  robots: getPublicPageRobots(),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SEO_SITE_URL,
    siteName: SEO_SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [SEO_SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [SEO_SOCIAL_IMAGE],
  },
};

export default function LandingPage() {
  return <LandingContent />;
}
