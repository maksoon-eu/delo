import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { EditOrderPageContent } from '@/components/orders/edit-order-page-content';
import { orderToFormValues } from '@/components/orders/constants';
import { getOrder } from '@/actions/orders';
import { RETURN_TO } from '@/constants/navigation';
import { getBackLink } from '@/utils/navigation';

type EditOrderPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [RETURN_TO]?: string | string[] }>;
};

export default async function EditOrderPage(props: EditOrderPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  const query = await searchParams;
  const backLink = getBackLink(query[RETURN_TO], `/orders/${id}`);

  const order = await getOrder(id);
  if (!order) notFound();

  const defaultValues = orderToFormValues(order);

  return (
    <AnimateIn className="page-stack flex-1">
      <PageHeader
        title={`Редактировать: ${order.title}`}
        description={`Клиент: ${order.clientName}`}
        showIcon={false}
        backLink={{ href: backLink, label: 'заказу' }}
      />
      <EditOrderPageContent
        orderId={id}
        defaultClient={{ id: order.clientId, name: order.clientName }}
        defaultValues={defaultValues}
      />
    </AnimateIn>
  );
}
