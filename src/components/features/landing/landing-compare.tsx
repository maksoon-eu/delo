'use client';

import { useState, type MouseEvent } from 'react';
import { LANDING_COMPARISON_ROWS } from '@/constants/landing';
import { Button } from '@/components/ui/actions/button';
import { cn } from '@/utils/cn';

type ComparisonMode = 'without' | 'with';

export function LandingCompare() {
  const [mode, setMode] = useState<ComparisonMode>('with');
  const isWithDelo = mode === 'with';

  function handleSelectMode(event: MouseEvent<HTMLButtonElement>) {
    setMode(event.currentTarget.dataset.mode as ComparisonMode);
  }

  return (
    <section id="compare" className="landing-section py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="font-display text-center text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.03] tracking-[-0.025em]">
          Хаос в чатах <span className="text-muted-foreground">vs</span> Delo
        </h2>

        <div className="mt-9 flex justify-center">
          <div className="border-border bg-card/40 relative inline-flex rounded-full border p-1">
            <span
              aria-hidden
              className={cn(
                'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-[transform,background-color] duration-500 ease-out motion-reduce:transition-none',
                isWithDelo
                  ? 'bg-primary/15 translate-x-[calc(100%+4px)]'
                  : 'bg-destructive/15 translate-x-0'
              )}
            />
            <Button
              type="button"
              variant="ghost"
              data-mode="without"
              onClick={handleSelectMode}
              aria-pressed={mode === 'without'}
              className={cn(
                'relative z-10 h-auto w-[150px] rounded-full border-0 bg-transparent px-5 py-2.5 text-sm font-bold transition-colors duration-300 hover:scale-100 hover:bg-transparent active:translate-y-0 active:scale-100 motion-reduce:transition-none dark:hover:bg-transparent',
                mode === 'without'
                  ? 'text-destructive'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Без Delo
            </Button>
            <Button
              type="button"
              variant="ghost"
              data-mode="with"
              onClick={handleSelectMode}
              aria-pressed={mode === 'with'}
              className={cn(
                'relative z-10 h-auto w-[150px] rounded-full border-0 bg-transparent px-5 py-2.5 text-sm font-bold transition-colors duration-300 hover:scale-100 hover:bg-transparent active:translate-y-0 active:scale-100 motion-reduce:transition-none dark:hover:bg-transparent',
                mode === 'with' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              С Delo
            </Button>
          </div>
        </div>

        <div className="border-border mx-auto mt-12 max-w-[920px] overflow-hidden rounded-[20px] border">
          {LANDING_COMPARISON_ROWS.map((row) => (
            <div
              key={row.param}
              className={cn(
                'border-border grid grid-cols-1 items-center gap-2 border-b px-6 py-5 transition-colors duration-500 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] sm:gap-6 sm:px-8',
                isWithDelo ? 'bg-primary/5' : 'bg-destructive/5'
              )}
            >
              <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.16em] sm:text-right">
                {row.param}
              </span>
              <span
                aria-hidden
                className={cn(
                  'grid size-[22px] shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors duration-500',
                  isWithDelo ? 'bg-primary/15 text-primary' : 'bg-destructive/15 text-destructive'
                )}
              >
                {isWithDelo ? '✓' : '✕'}
              </span>
              <span
                className={cn(
                  'text-[15px] leading-[1.5] transition-colors duration-500',
                  isWithDelo ? 'font-semibold' : 'text-muted-foreground'
                )}
              >
                {isWithDelo ? row.with : row.without}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
