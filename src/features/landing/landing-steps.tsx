import { LANDING_CONTENT, LANDING_STEPS } from '@/shared/constants/landing';
import { LandingCta } from '@/features/landing/landing-cta';

export function LandingSteps() {
  return (
    <section id="how" className="bg-secondary/40 my-10 py-14 sm:my-16 sm:py-20">
      <div className="landing-section grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
        <div>
          <h2 className="landing-heading whitespace-pre-line">{LANDING_CONTENT.how.title}</h2>
          <p className="text-muted-foreground mb-7 mt-5 max-w-sm text-base leading-relaxed">
            {LANDING_CONTENT.how.description}
          </p>
          <LandingCta href="/register">{LANDING_CONTENT.how.cta}</LandingCta>
        </div>
        <ol className="divide-border divide-y">
          {LANDING_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-5 py-6 first:pt-0 last:pb-0 sm:gap-7"
            >
              <span className="text-primary pt-0.5 text-3xl font-bold tracking-tight">
                {index + 1}.
              </span>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
