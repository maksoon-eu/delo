import type { Metadata } from 'next';
import { LandingHeader } from '@/components/features/landing/landing-header';
import { LandingHero } from '@/components/features/landing/landing-hero';
import { PainTicker } from '@/components/features/landing/pain-ticker';
import { LandingFeatures } from '@/components/features/landing/landing-features';
import { LandingSteps } from '@/components/features/landing/landing-steps';
import { LandingLocked } from '@/components/features/landing/landing-locked';
import { LandingMetrics } from '@/components/features/landing/landing-metrics';
import { LandingAudience } from '@/components/features/landing/landing-audience';
import { LandingCompare } from '@/components/features/landing/landing-compare';
import { LandingFaq } from '@/components/features/landing/landing-faq';
import { LandingFinalCta } from '@/components/features/landing/landing-final-cta';
import { AnimateIn } from '@/components/ui/feedback/animate-in';

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
