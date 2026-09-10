import { LandingCta } from '@/components/features/landing/landing-cta';
import { LandingHeroPreview } from '@/components/features/landing/landing-hero-preview';

export function LandingHero() {
  return (
    <section id="top" className="pb-30 pt-70 md:pb-50 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[180px] -top-[280px] size-[820px] animate-[landing-drift_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_34%,transparent),transparent_62%)] blur-[40px] motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[220px] -top-20 size-[720px] animate-[landing-drift_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_65%)] blur-[40px] [animation-delay:-8s] motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_25%,transparent_75%)]"
      />

      <div className="landing-section relative mx-auto grid max-w-[1440px] items-center gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-16">
        <div>
          <h1 className="font-display text-[clamp(44px,7.2vw,86px)] font-black leading-[0.94] tracking-[-0.03em]">
            Хватит вести
            <br />
            дела{' '}
            <span className="text-primary relative isolate inline-block">
              <span className="relative z-10">в чатах</span>
              <span
                aria-hidden
                className="bg-primary absolute -bottom-1 left-0 right-0 z-0 h-1.5 -rotate-1 rounded-full"
              />
            </span>
          </h1>

          <p className="text-muted-foreground mt-7 max-w-[440px] text-[17px] leading-[1.55]">
            Заказы, согласования, оплаты и документы — в одном окне.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LandingCta href="/register">Начать бесплатно</LandingCta>
            <LandingCta variant="ghost" disabledReason="Демо-заказ пока не опубликован">
              Смотреть демо
            </LandingCta>
          </div>

          <div className="border-border mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t pt-8">
            <div>
              <div className="font-display text-[26px] font-extrabold tracking-tight">15 000+</div>
              <div className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.14em]">
                фрилансеров
              </div>
            </div>
            <div>
              <div className="font-display text-[26px] font-extrabold tracking-tight">99,4%</div>
              <div className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.14em]">
                без споров
              </div>
            </div>
            <div>
              <div className="font-display text-[26px] font-extrabold tracking-tight">2 мин</div>
              <div className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.14em]">
                на заказ
              </div>
            </div>
          </div>
        </div>

        <LandingHeroPreview />
      </div>
    </section>
  );
}
