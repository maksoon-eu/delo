import { ORDERS_PAGE_SIZE } from '@/constants/pagination';
import { PageHeader } from '@/components/layout/page-header';
import { OrdersTable } from '@/components/orders/orders-table';
import { getOrders } from '@/actions/orders';
import { OrderStatus } from '@prisma/client';

type OrdersPageProps = {
  searchParams: Promise<{ status?: OrderStatus; clientId?: string }>;
};

export default async function OrdersPage(props: OrdersPageProps) {
  const { searchParams } = props;
  const { status, clientId } = await searchParams;

  const { items, hasMore } = await getOrders({
    offset: 0,
    take: ORDERS_PAGE_SIZE,
    status,
    clientId,
  });

  const listKey = `${status ?? ''}-${clientId ?? ''}-${items[0]?.id ?? 'empty'}`;

  return (
    <div className="page-stack flex-1">
      <PageHeader />
      <OrdersTable key={listKey} initialItems={items} initialHasMore={hasMore} />
    </div>
  );
}
