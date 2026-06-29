import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ContentCard } from '@/components/ui/data/content-card';
import { EditOrderPageContent } from '@/components/orders/edit-order-page-content';
import { orderToFormValues } from '@/components/orders/constants';
import { getOrder } from '@/actions/orders';

const item = NAV_ITEMS.orders;

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
    <AnimateIn className="page-stack flex-1">
      <PageHeader
        Icon={item.Icon}
        title={`Редактировать: ${order.title}`}
        description={`Клиент: ${order.clientName}`}
        backLink={{ href: `/orders/${id}`, label: 'заказу' }}
      />
      <ContentCard>
        <EditOrderPageContent
          orderId={id}
          defaultClient={{ id: order.clientId, name: order.clientName }}
          defaultValues={defaultValues}
        />
      </ContentCard>
    </AnimateIn>
  );
}
