import type { Metadata } from 'next';
import { MotionConfig } from 'motion/react';
import { LandingHeader } from '@/features/landing/landing-header';
import { LandingHero } from '@/features/landing/landing-hero';
import { LandingFeatures } from '@/features/landing/landing-features';
import { LandingSteps } from '@/features/landing/landing-steps';
import { LandingFaq } from '@/features/landing/landing-faq';
import { LandingFinalCta } from '@/features/landing/landing-final-cta';
import { LandingStructuredData } from '@/features/landing/landing-structured-data';
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
  return (
    <div className="landing-page bg-background text-foreground min-h-screen font-sans">
      <LandingStructuredData />
      <a
        href="#landing-main"
        className="bg-surface text-foreground border-border sr-only z-50 rounded-lg border p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>
      <LandingHeader />
      <MotionConfig reducedMotion="user">
        <main id="landing-main" tabIndex={-1}>
          <LandingHero />
          <LandingFeatures />
          <LandingSteps />
          <LandingFaq />
          <LandingFinalCta />
        </main>
      </MotionConfig>
    </div>
  );
}
