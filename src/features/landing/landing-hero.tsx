import Image from 'next/image';
import { LANDING_CONTENT, LANDING_DOODLES } from '@/shared/constants/landing';
import { LandingCta } from '@/features/landing/landing-cta';
import { LandingHeroPreview } from '@/features/landing/landing-hero-preview';
import { LandingScribble } from '@/features/landing/landing-scribble';

export function LandingHero() {
  return (
    <section className="landing-hero bg-background relative isolate px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
      <div
        aria-hidden
        className="bg-background pointer-events-none absolute inset-0 -z-10 mx-auto hidden max-w-[1440px] overflow-hidden xl:block"
      >
        <Image
          src={LANDING_DOODLES.designer}
          alt=""
          className="landing-doodle absolute left-5 top-48 w-36 -rotate-12 2xl:left-12 2xl:w-44"
          sizes="192px"
        />
        <Image
          src={LANDING_DOODLES.writer}
          alt=""
          className="landing-doodle absolute right-5 top-56 w-36 rotate-12 2xl:right-12 2xl:w-44"
          sizes="176px"
        />
        <Image
          src={LANDING_DOODLES.developer}
          alt=""
          className="landing-doodle absolute left-2 top-[550px] w-32 rotate-6 2xl:left-10 2xl:w-40"
          sizes="160px"
        />
        <Image
          src={LANDING_DOODLES.photographer}
          alt=""
          className="landing-doodle absolute right-2 top-[620px] w-32 -rotate-6 2xl:right-8 2xl:w-40"
          sizes="160px"
        />
        <LandingScribble
          variant="spark"
          className="absolute left-[17%] top-40 size-12 -rotate-12"
        />
        <LandingScribble
          variant="arrow"
          className="absolute right-[15%] top-[390px] w-28 rotate-[30deg]"
        />
      </div>

      <div className="relative mx-auto max-w-[900px] text-center">
        <h1 className="text-[clamp(2.5rem,5.6vw,5rem)] font-bold leading-[1.1] tracking-[-0.045em]">
          {LANDING_CONTENT.hero.title}
          <br className="hidden sm:block" /> {LANDING_CONTENT.hero.titleLead}{' '}
          <span className="relative inline-block">
            {LANDING_CONTENT.hero.titleAccent}
            <LandingScribble
              variant="underline"
              className="absolute -bottom-4 left-0 h-5 w-full sm:-bottom-5 sm:h-6"
            />
          </span>
        </h1>
        <p className="mx-auto mt-9 max-w-[600px] text-base leading-relaxed sm:mt-10 sm:text-xl">
          {LANDING_CONTENT.hero.description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-9">
          <LandingCta href="/register">{LANDING_CONTENT.hero.cta}</LandingCta>
          <p className="text-sm font-medium">{LANDING_CONTENT.pricingNotice}</p>
        </div>
        <div aria-hidden className="mx-auto mt-7 flex w-fit items-end gap-7 xl:hidden">
          <Image
            src={LANDING_DOODLES.designer}
            alt=""
            className="landing-doodle w-16 -rotate-12 sm:w-20"
            sizes="80px"
          />
          <LandingScribble variant="spark" className="mb-5 size-7" />
          <Image
            src={LANDING_DOODLES.writer}
            alt=""
            className="landing-doodle w-16 rotate-12 sm:w-20"
            sizes="80px"
          />
        </div>
      </div>
      <div className="relative mx-auto mt-9 max-w-[1000px] lg:mt-14">
        <LandingHeroPreview />
      </div>
    </section>
  );
}
