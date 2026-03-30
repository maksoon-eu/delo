import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { BackLink } from '@/components/ui/navigation/back-link';
import { NewOrderPageContent } from '@/components/orders/new-order-page-content';

const item = NAV_ITEMS[2];

export default async function NewOrderPage() {
  return (
    <AnimateIn className="flex flex-1 flex-col">
      <PageHeader Icon={item.Icon} title="Новый заказ" description="Создайте новый заказ" />
      <div className="glass rounded-xl border p-6 shadow-sm">
        <BackLink href="/orders" label="заказам" />
        <div className="mt-6">
          <NewOrderPageContent />
        </div>
      </div>
    </AnimateIn>
  );
}
