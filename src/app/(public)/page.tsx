import type { Metadata } from 'next';
import { LandingHeader } from '@/features/landing/landing-header';
import { LandingHero } from '@/features/landing/landing-hero';
import { PainTicker } from '@/features/landing/pain-ticker';
import { LandingFeatures } from '@/features/landing/landing-features';
import { LandingSteps } from '@/features/landing/landing-steps';
import { LandingLocked } from '@/features/landing/landing-locked';
import { LandingMetrics } from '@/features/landing/landing-metrics';
import { LandingAudience } from '@/features/landing/landing-audience';
import { LandingCompare } from '@/features/landing/landing-compare';
import { LandingFaq } from '@/features/landing/landing-faq';
import { LandingFinalCta } from '@/features/landing/landing-final-cta';
import { AnimateIn } from '@/shared/components/ui/feedback/animate-in';

export const metadata: Metadata = {
  title: 'Delo — заказы, оплаты и документы для фрилансеров',
  description: 'Клиенты, заказы, согласования, оплаты и документы для фрилансеров в одном сервисе.',
  robots: { index: true, follow: true },
};

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <LandingHeader />
      <AnimateIn variant="fade">
        <main>
          <LandingHero />
          <PainTicker />
          <LandingFeatures />
          <LandingSteps />
          <LandingLocked />
          <LandingMetrics />
          <LandingAudience />
          <LandingCompare />
          <LandingFaq />
          <LandingFinalCta />
        </main>
      </AnimateIn>
    </div>
  );
}
