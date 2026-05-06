import { List } from 'lucide-react';
import { ContentCard } from '@/components/ui/data/content-card';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { formatPrice } from '@/lib/utils';
import type { PublicOrderItemData } from '@/types';

type OrderItemsSectionProps = {
  items: PublicOrderItemData[];
};

export function OrderItemsSection(props: OrderItemsSectionProps) {
  const { items } = props;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimateIn variant="slide-up">
      <ContentCard className="bg-card">
        <h2 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
          <List className="size-4" />
          Состав работ
        </h2>
        <EmptyList items={items} message="Состав работ не указан">
          <div className="space-y-0">
            <div className="text-muted-foreground mb-2 grid grid-cols-[1fr_auto] gap-x-4 text-xs font-bold">
              <span>Наименование</span>
              <span className="text-right">Сумма</span>
            </div>
            <div className="divide-border divide-y">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_auto] gap-x-4 py-3">
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-muted-foreground mt-0.5 text-xs">{item.description}</p>
                    )}
                  </div>
                  <span className="text-foreground self-center whitespace-nowrap text-sm font-medium">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-border mt-2 flex justify-between border-t pt-3">
              <span className="text-foreground text-sm font-bold">Итого</span>
              <span className="text-foreground text-sm font-bold">{formatPrice(total)}</span>
            </div>
          </div>
        </EmptyList>
      </ContentCard>
    </AnimateIn>
  );
}
