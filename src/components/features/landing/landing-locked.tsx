import Image from 'next/image';
import { Check } from 'lucide-react';
import orderDetailsImage from '@/assets/images/landing/order-details.png';
import { LandingCta } from '@/components/features/landing/landing-cta';
import { LANDING_LOCKED_ITEMS } from '@/constants/landing';

export function LandingLocked() {
  return (
    <section className="bg-secondary/30 relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[900px] -translate-x-1/2 animate-[landing-drift_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_65%)] blur-[60px] motion-reduce:animate-none"
      />
      <div className="landing-section relative mx-auto max-w-[1100px] text-center">
        <h2 className="font-display text-[clamp(34px,5.4vw,66px)] font-black leading-[1.02] tracking-[-0.03em]">
          Никаких споров.
          <br />
          <span className="text-primary">Всё зафиксировано.</span>
        </h2>

        <div className="mt-9 flex flex-wrap justify-center gap-2.5">
          {LANDING_LOCKED_ITEMS.map((item) => (
            <span
              key={item}
              className="border-primary/25 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold"
            >
              <Check aria-hidden className="size-3.5" />
              {item}
            </span>
          ))}
        </div>

        <div className="landing-shot-glow relative mx-auto mt-14 max-w-[880px]">
          <div className="landing-shot border-border bg-card relative overflow-hidden rounded-2xl border shadow-[0_50px_100px_-40px_color-mix(in_oklab,var(--foreground)_55%,transparent)]">
            <Image
              src={orderDetailsImage}
              alt="Завершённый заказ с подтверждёнными условиями, полной оплатой и подписанным актом"
              className="block h-auto w-full"
              sizes="(min-width: 1024px) 880px, 100vw"
            />
          </div>
        </div>

        <div className="mt-12">
          <LandingCta href="/register">Попробовать бесплатно</LandingCta>
        </div>
      </div>
    </section>
  );
}
