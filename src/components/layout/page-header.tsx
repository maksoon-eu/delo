import { AnimatedIconComponent } from '@/types';

type PageHeaderProps = {
  Icon: AnimatedIconComponent;
  title: string;
  description: string;
};

export function PageHeader(props: PageHeaderProps) {
  const { Icon, title, description } = props;

  return (
    <div className="glass border-accent/50 mb-8 rounded-xl border px-4 py-3 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <Icon size={20} />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
