'use client';

import { BackLink } from '@/components/ui/navigation/back-link';
import { useCurrentPage } from '@/hooks/use-current-page';
import type { AnimatedIconComponent } from '@/types/icons';

type PageHeaderProps = {
  Icon?: AnimatedIconComponent;
  title?: string;
  description?: string;
  showIcon?: boolean;
  backLink?: {
    href: string;
    label: string;
  };
};

export function PageHeader(props: PageHeaderProps) {
  const { Icon: IconOverride, title, description, showIcon = true, backLink } = props;

  const page = useCurrentPage();
  const Icon = IconOverride ?? page.Icon;
  const headerTitle = title ?? page.pageTitle ?? page.label;
  const headerDescription = description ?? page.description;

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
      {backLink && <BackLink href={backLink.href} label={backLink.label} size="full" />}
      <div className="flex min-w-0 items-start gap-3 only:col-span-2">
        {showIcon && (
          <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
            <Icon size={20} />
          </span>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{headerTitle}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{headerDescription}</p>
        </div>
      </div>
    </div>
  );
}
