import { LANDING_METRICS } from '@/constants/landing';

export function LandingMetrics() {
  return (
    <section className="landing-section py-20 md:py-24">
      <div className="border-border bg-border mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-[20px] border sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_METRICS.map((metric) => (
          <article
            key={metric.label}
            className="bg-background hover:bg-primary/10 group h-full p-8 transition-colors duration-500 motion-reduce:transition-none"
          >
            <p className="text-primary font-display text-[clamp(30px,3.4vw,40px)] font-extrabold tracking-tight">
              {metric.value}
            </p>
            <div className="bg-primary/50 mt-3 h-px w-10 transition-[width] duration-500 group-hover:w-20 motion-reduce:transition-none motion-reduce:group-hover:w-10" />
            <p className="mt-3 text-sm font-semibold">{metric.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
