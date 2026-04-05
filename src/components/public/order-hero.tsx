import { Badge } from '@/components/ui/data/badge';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ContentCard } from '@/components/ui/data/content-card';
import { ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS } from '@/constants';
import { formatDate } from '@/lib/utils';
import type { PublicOrderData } from '@/types';

type OrderHeroProps = {
  order: PublicOrderData;
};

export function OrderHero(props: OrderHeroProps) {
  const { order } = props;

  return (
    <AnimateIn variant="slide-up">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-foreground text-2xl font-bold leading-tight">{order.title}</h1>
          <Badge variant={ORDER_STATUS_VARIANTS[order.status]} size="sm">
            {ORDER_STATUS_LABELS[order.status]}
          </Badge>
        </div>

        {order.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">{order.description}</p>
        )}

        <ContentCard className="grid grid-cols-2 gap-x-6 gap-y-3 bg-card text-sm">
          <div>
            <dt className="text-muted-foreground text-xs font-bold">Исполнитель</dt>
            <dd className="font-medium">{order.executorName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs font-bold">Клиент</dt>
            <dd className="font-medium">{order.client.name}</dd>
          </div>
          {order.client.company && (
            <div>
              <dt className="text-muted-foreground text-xs font-bold">Компания</dt>
              <dd className="font-medium">{order.client.company}</dd>
            </div>
          )}
          {order.deadline && (
            <div>
              <dt className="text-muted-foreground text-xs font-bold">Срок</dt>
              <dd className="font-medium">{formatDate(order.deadline, 'd MMMM yyyy')}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground text-xs font-bold">Создан</dt>
            <dd className="font-medium">{formatDate(order.createdAt, 'd MMMM yyyy')}</dd>
          </div>
          {order.confirmedAt && (
            <div>
              <dt className="text-muted-foreground text-xs font-bold">Подтверждён</dt>
              <dd className="font-medium">{formatDate(order.confirmedAt, 'd MMMM yyyy')}</dd>
            </div>
          )}
        </ContentCard>
      </div>
    </AnimateIn>
  );
}
