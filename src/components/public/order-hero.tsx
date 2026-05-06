import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/data/badge';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ContentCard } from '@/components/ui/data/content-card';
import { DetailItem } from '@/components/ui/data/detail-item';
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

        <ContentCard className="bg-card">
          <h2 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
            <FileText className="size-4" />
            О заказе
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <DetailItem label="Исполнитель">{order.executorName}</DetailItem>
            <DetailItem label="Клиент">{order.client.name}</DetailItem>
            {order.client.company && (
              <DetailItem label="Компания">{order.client.company}</DetailItem>
            )}
            {order.deadline && (
              <DetailItem label="Срок">{formatDate(order.deadline, 'd MMMM yyyy')}</DetailItem>
            )}
            <DetailItem label="Создан">{formatDate(order.createdAt, 'd MMMM yyyy')}</DetailItem>
            {order.confirmedAt && (
              <DetailItem label="Подтверждён">
                {formatDate(order.confirmedAt, 'd MMMM yyyy')}
              </DetailItem>
            )}
          </dl>
        </ContentCard>
      </div>
    </AnimateIn>
  );
}
