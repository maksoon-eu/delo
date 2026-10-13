import Image from 'next/image';
import { LANDING_CONTENT, LANDING_STORIES } from '@/shared/constants/landing';
import { LandingScribble } from '@/features/landing/landing-scribble';
import { cn } from '@/shared/utils/cn';

export function LandingFeatures() {
  return (
    <section id="features" className="landing-section py-12 sm:py-20">
      <h2 className="landing-heading mx-auto max-w-3xl whitespace-pre-line text-center">
        {LANDING_CONTENT.features.title}
      </h2>
      <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
        {LANDING_STORIES.map((story, index) => (
          <article
            key={story.id}
            id={story.id}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
          >
            <div className={cn('max-w-lg', index === 1 && 'lg:order-2')}>
              <h3 className="whitespace-pre-line text-3xl font-bold leading-[1.18] tracking-[-0.035em] sm:text-4xl">
                {story.title}
              </h3>
              <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
                {story.body}
              </p>
              <p className="mt-5 text-sm font-medium">{story.note}</p>
              <LandingScribble
                variant="arrow"
                className={cn('mt-6 hidden w-24 lg:block', index === 1 && '-scale-x-100')}
              />
            </div>
            <figure className={cn('min-w-0', index === 1 && 'lg:order-1')}>
              <div className="border-foreground/15 bg-surface overflow-hidden rounded-lg border">
                <Image
                  src={story.image}
                  alt={story.alt}
                  className={cn('block h-auto', story.imageClassName)}
                  sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 100vw"
                />
              </div>
              <figcaption className="text-muted-foreground mt-3 text-center text-xs">
                {story.visualLabel}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
