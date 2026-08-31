'use client';

import { useState } from 'react';
import { LandingStepCard } from '@/components/features/landing/landing-step-card';
import { LANDING_STEPS } from '@/constants/landing';

export function LandingSteps() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="how" className="bg-secondary/30 border-border border-y py-24 md:py-32">
      <div className="landing-section mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.03] tracking-[-0.025em]">
            Четыре шага —
            <br />и вы защищены
          </h2>
          <span className="text-muted-foreground font-mono text-xs">
            0{activeIndex + 1} / 0{LANDING_STEPS.length}
          </span>
        </div>

        <div className="border-border bg-border mt-14 grid gap-px overflow-hidden rounded-[20px] border md:grid-cols-4">
          {LANDING_STEPS.map((step, index) => (
            <LandingStepCard
              key={step.title}
              index={index}
              title={step.title}
              body={step.body}
              active={index === activeIndex}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
