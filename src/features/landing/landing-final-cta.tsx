import Image from 'next/image';
import Link from 'next/link';
import { LANDING_CONTENT, LANDING_DOODLES } from '@/shared/constants/landing';
import { LandingCta } from '@/features/landing/landing-cta';
import { LandingScribble } from '@/features/landing/landing-scribble';

export function LandingFinalCta() {
  return (
    <section className="landing-section bg-background relative isolate overflow-hidden pb-20 pt-12 text-center sm:pb-28 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-6 flex items-end justify-center gap-5"
      >
        <Image
          src={LANDING_DOODLES.developer}
          alt=""
          className="landing-doodle w-20 -rotate-6 sm:w-28"
          sizes="112px"
        />
        <LandingScribble variant="spark" className="mb-5 size-9 sm:size-12" />
        <Image
          src={LANDING_DOODLES.photographer}
          alt=""
          className="landing-doodle w-20 rotate-6 sm:w-28"
          sizes="112px"
        />
      </div>
      <h2 className="landing-heading whitespace-pre-line">{LANDING_CONTENT.final.title}</h2>
      <p className="text-muted-foreground mx-auto mt-5 max-w-md text-base leading-relaxed">
        {LANDING_CONTENT.final.description}
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <LandingCta href="/register">{LANDING_CONTENT.final.cta}</LandingCta>
        <Link href="/login" className="landing-nav-link min-h-10 py-2 text-xs">
          {LANDING_CONTENT.final.login}
        </Link>
      </div>
    </section>
  );
}
