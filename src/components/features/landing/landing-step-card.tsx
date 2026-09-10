import { cn } from '@/utils/cn';

type LandingStepCardProps = {
  index: number;
  title: string;
  body: string;
  active: boolean;
  onSelect: (index: number) => void;
};

export function LandingStepCard(props: LandingStepCardProps) {
  const { index, title, body, active, onSelect } = props;

  function handleMouseEnter() {
    onSelect(index);
  }

  return (
    <article
      onMouseEnter={handleMouseEnter}
      className={cn(
        'relative flex min-h-64 flex-col items-start gap-6 p-8 text-left transition-colors duration-500 motion-reduce:transition-none',
        active ? 'bg-primary/10' : 'bg-background hover:bg-card'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'bg-primary absolute inset-x-0 top-0 h-px origin-left transition-transform duration-500 motion-reduce:transition-none',
          active ? 'scale-x-100' : 'scale-x-0'
        )}
      />
      <span
        className={cn(
          'font-display grid size-11 place-items-center rounded-full text-[15px] font-extrabold transition-[color,background-color,box-shadow] duration-500 motion-reduce:transition-none',
          active
            ? 'bg-primary text-primary-foreground shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_16%,transparent)]'
            : 'bg-card text-muted-foreground'
        )}
      >
        0{index + 1}
      </span>
      <span className="block">
        <span className="font-display block text-xl font-bold">{title}</span>
        <span
          className={cn(
            'mt-2 block text-sm leading-[1.55] transition-colors duration-500 motion-reduce:transition-none',
            active ? 'text-foreground/70' : 'text-muted-foreground'
          )}
        >
          {body}
        </span>
      </span>
    </article>
  );
}
