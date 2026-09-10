'use client';

import { useState, type MouseEvent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/actions/button';
import { LANDING_FAQ } from '@/constants/landing';
import { cn } from '@/utils/cn';

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const index = +event.currentTarget.dataset.index!;
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section id="faq" className="bg-secondary/30 border-border border-t py-24 md:py-32">
      <div className="landing-section mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-16">
        <h2 className="font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          Коротко
          <br />о главном
        </h2>

        <div className="border-border divide-border divide-y border-y">
          {LANDING_FAQ.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question}>
                <Button
                  type="button"
                  variant="ghost"
                  data-index={index}
                  aria-expanded={isOpen}
                  onClick={handleToggle}
                  className="hover:text-primary h-auto w-full justify-between whitespace-normal rounded-none border-0 bg-transparent px-0 py-5 text-left font-normal transition-colors duration-300 hover:scale-100 hover:bg-transparent active:translate-y-0 active:scale-100 aria-expanded:bg-transparent motion-reduce:transition-none dark:hover:bg-transparent dark:aria-expanded:bg-transparent"
                >
                  <span className="font-display text-[17px] font-bold">{item.question}</span>
                  <span
                    aria-hidden
                    className={cn(
                      'border-border text-muted-foreground grid size-7 shrink-0 place-items-center rounded-full border transition-[color,background-color,border-color,transform] duration-500 motion-reduce:transition-none',
                      isOpen &&
                        'border-primary/60 bg-primary/15 text-primary rotate-45 motion-reduce:rotate-0'
                    )}
                  >
                    <Plus aria-hidden className="size-3.5" />
                  </span>
                </Button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <p className="text-muted-foreground overflow-hidden pr-10 text-[15px] leading-[1.6]">
                    <span className="block pb-6">{item.answer}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
