import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ORDER_FINAL_STATUSES } from '@/constants/orders';
import { env } from '@/config/env';
import { formatDate, formatPrice } from '@/utils/format';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { Button } from '@/components/ui/actions/button';
import { OrderStatusPanel } from '@/components/orders/order-status-panel';
import { OrderDocumentsSection } from '@/components/orders/order-documents-section';
import { ActivityLog } from '@/components/orders/activity-log';
import { PaymentsSection } from '@/components/orders/payments-section';
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right';
import { DetailItem } from '@/components/ui/data/detail-item';
import { ContentCard } from '@/components/ui/data/content-card';
import { getOrder } from '@/actions/orders';
import type { Route } from 'next';

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage(props: OrderPageProps) {
  const { params } = props;
  const { id } = await params;

  const order = await getOrder(id);
  if (!order) notFound();

  const totalItems = order.items.reduce((sum, i) => sum + i.price, 0);
  const publicOrderUrl = new URL(`/order/${order.publicToken}`, env.NEXT_PUBLIC_APP_URL).toString();
  const canEditOrder = !ORDER_FINAL_STATUSES.some((status) => status === order.status);

  return (
    <div className="page-stack flex-1">
      <PageHeader
        title={order.title}
        description={`Заказ · ${order.clientName}`}
        backLink={{ href: '/orders', label: 'заказам' }}
      />

      <AnimateIn className="space-y-5">
        <ContentCard>
          <OrderStatusPanel
            orderId={order.id}
            currentStatus={order.status}
            publicOrderUrl={publicOrderUrl}
            canEditOrder={canEditOrder}
            editHref={`/orders/${id}/edit` as Route<string>}
          />
        </ContentCard>

        <ContentCard>
          <OrderDocumentsSection orderId={order.id} documents={order.documents} />
        </ContentCard>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="flex flex-col gap-5 lg:col-span-2">
            <ContentCard className={order.items.length === 0 ? 'flex-1' : undefined}>
              <h2 className="mb-4 font-semibold">Детали заказа</h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                <DetailItem label="Клиент">
                  <div className="flex items-center">
                    {order.clientName}
                    <Link href={`/clients/${order.clientId}`}>
                      <Button
                        mode="icon"
                        variant="ghost"
                        Icon={ArrowUpRightIcon}
                        tooltip="Открыть клиента"
                      />
                    </Link>
                  </div>
                </DetailItem>
                <DetailItem label="Создан">{formatDate(order.createdAt)}</DetailItem>
                {order.startDate && (
                  <DetailItem label="Дата начала">{formatDate(order.startDate)}</DetailItem>
                )}
                {order.deadline && (
                  <DetailItem label="Дедлайн">{formatDate(order.deadline)}</DetailItem>
                )}
                <DetailItem label="Стоимость">{formatPrice(order.price)}</DetailItem>
              </dl>
              {order.description && (
                <div className="border-border mt-4 border-t pt-4">
                  <DetailItem label="Описание">{order.description}</DetailItem>
                </div>
              )}
            </ContentCard>

            {order.items.length > 0 && (
              <ContentCard className="flex-1">
                <h2 className="mb-4 font-semibold">Состав работ</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-muted-foreground border-border border-b text-xs">
                        <th className="pb-2 text-left font-bold">Название</th>
                        <th className="pb-2 text-right font-bold">Стоимость</th>
                      </tr>
                    </thead>
                    <tbody className="divide-border divide-y">
                      {order.items.map((orderItem) => (
                        <tr key={orderItem.id}>
                          <td className="py-2">
                            <p className="font-medium">{orderItem.name}</p>
                            {orderItem.description && (
                              <p className="text-muted-foreground text-xs">
                                {orderItem.description}
                              </p>
                            )}
                          </td>
                          <td className="py-2 text-right font-medium">
                            {formatPrice(orderItem.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-border border-t">
                        <td colSpan={2} className="pt-2 text-right font-semibold">
                          <span className="text-muted-foreground mr-2 text-xs font-bold">
                            Итого:
                          </span>
                          {formatPrice(totalItems)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </ContentCard>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <ContentCard>
              <PaymentsSection
                orderId={order.id}
                payments={order.payments}
                paymentStatus={order.paymentStatus}
                orderPrice={order.price}
              />
            </ContentCard>

            <ContentCard className="flex-1">
              <h2 className="mb-4 font-semibold">История</h2>
              <ActivityLog activities={order.activities} />
            </ContentCard>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
