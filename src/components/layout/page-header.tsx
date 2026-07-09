'use client';

import { BackLink } from '@/components/ui/navigation/back-link';
import { useCurrentPage } from '@/hooks/use-current-page';
import type { AnimatedIconComponent } from '@/types/icons';

type PageHeaderProps = {
  Icon?: AnimatedIconComponent;
  title?: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
};

export function PageHeader(props: PageHeaderProps) {
  const { Icon: IconOverride, title, description, backLink } = props;

  const page = useCurrentPage();
  const Icon = IconOverride ?? page.Icon;
  const headerTitle = title ?? page.label;
  const headerDescription = description ?? page.description;

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
      {backLink && <BackLink href={backLink.href} label={backLink.label} size="full" />}
      <div className="glass border-glass min-w-0 rounded-xl px-4 py-3 only:col-span-2">
        <div className="mb-1 flex items-center gap-2">
          <Icon size={20} />
          <h1 className="text-xl font-bold">{headerTitle}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{headerDescription}</p>
      </div>
    </div>
  );
}
