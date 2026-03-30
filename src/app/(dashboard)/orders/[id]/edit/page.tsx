import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { BackLink } from '@/components/ui/navigation/back-link';
import { EditOrderPageContent } from '@/components/orders/edit-order-page-content';
import { orderToFormValues } from '@/components/orders/constants';
import { getOrder } from '@/actions/orders';
import type { Route } from 'next';

const item = NAV_ITEMS[2];

type EditOrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditOrderPage(props: EditOrderPageProps) {
  const { params } = props;
  const { id } = await params;

  const order = await getOrder(id);
  if (!order) notFound();

  const defaultValues = orderToFormValues(order);

  return (
    <AnimateIn className="flex flex-1 flex-col">
      <PageHeader
        Icon={item.Icon}
        title={`Редактировать: ${order.title}`}
        description={`Клиент: ${order.clientName}`}
      />
      <div className="glass rounded-xl border p-6 shadow-sm">
        <BackLink href={`/orders/${id}` as Route<string>} label="заказу" />
        <div className="mt-6">
          <EditOrderPageContent
            orderId={id}
            defaultClient={{ id: order.clientId, name: order.clientName }}
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </AnimateIn>
  );
}
