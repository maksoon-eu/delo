import type { OrderStatus } from '@prisma/client';

export const ORDER_STATUS_BADGE_CLASS_NAMES: Record<OrderStatus, string> = {
  DRAFT:
    'border-border bg-muted/70 text-foreground ring-1 ring-inset ring-border/80  dark:bg-muted/50',
  SENT: 'border-primary/30 bg-primary/10 text-primary ring-1 ring-inset ring-primary/25  dark:bg-primary/20',
  CONFIRMED:
    'border-accent/60 bg-accent/25 text-accent-foreground ring-1 ring-inset ring-accent/50  dark:bg-accent/35',
  IN_PROGRESS:
    'border-primary/40 bg-primary text-primary-foreground ring-1 ring-inset ring-primary/40 ',
  COMPLETED:
    'border-chart-4/70 bg-chart-4/25 text-chart-5 ring-1 ring-inset ring-chart-4/60  dark:bg-chart-4/20 dark:text-chart-4',
  CANCELLED:
    'border-destructive/35 bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/25  dark:bg-destructive/20',
};
