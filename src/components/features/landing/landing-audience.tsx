'use client';

import { useState, type MouseEvent } from 'react';
import { LANDING_AUDIENCES } from '@/constants/landing';
import { Button } from '@/components/ui/actions/button';
import { cn } from '@/utils/cn';

export function LandingAudience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = LANDING_AUDIENCES[activeIndex];

  function handleSelectAudience(event: MouseEvent<HTMLButtonElement>) {
    setActiveIndex(+event.currentTarget.dataset.index!);
  }

  return (
    <section className="bg-secondary/30 border-border border-y py-24 md:py-32">
      <div className="landing-section mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="font-display text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.03] tracking-[-0.025em]">
            Кому Delo
            <br />
            <span className="text-muted-foreground">экономит нервы</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {LANDING_AUDIENCES.map((audience, index) => (
              <Button
                key={audience.tab}
                type="button"
                variant="ghost"
                data-index={index}
                onClick={handleSelectAudience}
                aria-pressed={index === activeIndex}
                className={cn(
                  'h-auto rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-[color,background-color,border-color] duration-300 hover:scale-100 active:translate-y-0 active:scale-100 motion-reduce:transition-none',
                  index === activeIndex
                    ? 'border-primary/60 bg-primary/15 text-foreground hover:bg-primary/15 dark:hover:bg-primary/15'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-transparent dark:hover:bg-transparent'
                )}
              >
                {audience.tab}
              </Button>
            ))}
          </div>
        </div>

        <article
          key={current.title}
          className="landing-feature-card border-l-primary animate-in fade-in-0 slide-in-from-bottom-2 min-h-64 border-l-[3px] p-9 duration-300 motion-reduce:animate-none"
        >
          <span className="text-primary font-mono text-[11px] uppercase tracking-[0.2em]">
            {current.meta}
          </span>
          <h3 className="font-display mt-5 text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.15]">
            {current.title}
          </h3>
          <p className="text-muted-foreground mt-4 max-w-[420px] text-base leading-[1.6]">
            {current.body}
          </p>
        </article>
      </div>
    </section>
  );
}
