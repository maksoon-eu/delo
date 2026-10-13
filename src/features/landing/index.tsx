import { LandingHeader } from './ui/landing-header';
import { LandingHero } from './ui/landing-hero';
import { LandingFeatures } from './ui/landing-features';
import { LandingSteps } from './ui/landing-steps';
import { LandingFaq } from './ui/landing-faq';
import { LandingFinalCta } from './ui/landing-final-cta';
import { LandingStructuredData } from './ui/landing-structured-data';

export function LandingContent() {
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
      <main id="landing-main" tabIndex={-1}>
        <LandingHero />
        <LandingFeatures />
        <LandingSteps />
        <LandingFaq />
        <LandingFinalCta />
      </main>
    </div>
  );
}
