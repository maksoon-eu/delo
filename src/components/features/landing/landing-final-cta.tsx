import { LandingCta } from '@/components/features/landing/landing-cta';

export function LandingFinalCta() {
  return (
    <section className="from-primary/10 to-background bg-linear-to-b relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[860px] -translate-x-1/2 animate-[landing-drift_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_65%)] blur-[50px] motion-reduce:animate-none"
      />
      <div className="landing-section relative mx-auto max-w-[900px] text-center">
        <h2 className="font-display text-[clamp(34px,5vw,60px)] font-black leading-[1.03] tracking-[-0.03em]">
          Начните вести дела
          <br />
          <span className="text-primary">профессионально</span>
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-[440px] text-[17px]">
          2 минуты на регистрацию. Платёжные данные не нужны.
        </p>
        <div className="mt-10">
          <LandingCta href="/register">Создать аккаунт</LandingCta>
        </div>
      </div>
    </section>
  );
}
