import { LANDING_PAINS } from '@/constants/landing';

export function PainTicker() {
  return (
    <section className="bg-secondary/30 border-border relative overflow-hidden border-y py-7">
      <div
        aria-hidden
        className="from-secondary/30 bg-linear-to-r absolute inset-y-0 left-0 z-10 w-28 to-transparent"
      />
      <div
        aria-hidden
        className="from-secondary/30 bg-linear-to-l absolute inset-y-0 right-0 z-10 w-28 to-transparent"
      />
      <div className="flex w-max animate-[landing-marquee_38s_linear_infinite] items-center gap-10 motion-reduce:animate-none">
        {[...LANDING_PAINS, ...LANDING_PAINS].map((pain, index) => (
          <div key={`${pain}-${index}`} className="flex items-center gap-10">
            <span className="text-muted-foreground font-display whitespace-nowrap text-[clamp(20px,2.4vw,30px)] font-bold">
              {pain}
            </span>
            <span className="bg-destructive/70 size-1.5 shrink-0 rotate-45" />
          </div>
        ))}
      </div>
    </section>
  );
}
