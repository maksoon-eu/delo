import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CircleDollarSign, FileText, History, List } from 'lucide-react';
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
import { PaymentFormDialog } from '@/components/orders/payment-form-dialog';
import { ArrowUpRightIcon } from '@/components/icons/arrow-up-right';
import { DetailItem } from '@/components/ui/data/detail-item';
import { SectionCard } from '@/components/ui/data/section-card';
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
        showIcon={false}
        backLink={{ href: '/orders', label: 'заказам' }}
      />

      <AnimateIn className="space-y-6">
        <OrderStatusPanel
          orderId={order.id}
          currentStatus={order.status}
          publicOrderUrl={publicOrderUrl}
          canEditOrder={canEditOrder}
          editHref={`/orders/${id}/edit` as Route<string>}
        />

        <OrderDocumentsSection orderId={order.id} documents={order.documents} />

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <SectionCard
            title="Детали заказа"
            Icon={FileText}
            className="h-88 flex min-h-0 flex-col overflow-hidden p-6"
          >
            <dl className="flex min-h-0 flex-1 flex-col gap-4">
              <DetailItem
                label="Клиент"
                className="flex items-start justify-between gap-6 [&_dd]:min-w-0 [&_dd]:text-right [&_dt]:shrink-0 [&_dt]:text-sm [&_dt]:font-normal"
              >
                <span className="flex items-center justify-end">
                  {order.clientName}
                  <Link href={`/clients/${order.clientId}`}>
                    <Button
                      mode="icon"
                      variant="ghost"
                      Icon={ArrowUpRightIcon}
                      tooltip="Открыть клиента"
                    />
                  </Link>
                </span>
              </DetailItem>
              <DetailItem
                label="Создан"
                className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
              >
                {formatDate(order.createdAt)}
              </DetailItem>
              {order.startDate && (
                <DetailItem
                  label="Дата начала"
                  className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
                >
                  {formatDate(order.startDate)}
                </DetailItem>
              )}
              {order.deadline && (
                <DetailItem
                  label="Дедлайн"
                  className="flex items-start justify-between gap-6 [&_dd]:text-right [&_dt]:text-sm [&_dt]:font-normal"
                >
                  {formatDate(order.deadline)}
                </DetailItem>
              )}
              {order.description && (
                <DetailItem
                  label="Описание"
                  className="border-border flex min-h-0 flex-1 flex-col border-t pt-4 [&_dd]:mt-2 [&_dd]:min-h-0 [&_dd]:flex-1 [&_dd]:overflow-y-auto [&_dd]:pr-2 [&_dd]:leading-relaxed [&_dt]:shrink-0 [&_dt]:text-sm [&_dt]:font-normal"
                >
                  {order.description}
                </DetailItem>
              )}
            </dl>
          </SectionCard>

          <SectionCard
            title="Оплата"
            Icon={CircleDollarSign}
            action={<PaymentFormDialog orderId={order.id} />}
            className="h-88 flex min-h-0 flex-col overflow-hidden p-6"
          >
            <PaymentsSection
              payments={order.payments}
              paymentStatus={order.paymentStatus}
              orderPrice={order.price}
            />
          </SectionCard>

          <SectionCard
            title="Состав работ"
            Icon={List}
            className="flex h-80 min-h-0 flex-col overflow-hidden p-6"
          >
            <div className="shrink-0 pr-2">
              <table className="w-full table-fixed">
                <colgroup>
                  <col />
                  <col className="w-28" />
                </colgroup>
                <thead>
                  <tr className="text-muted-foreground border-border border-b text-xs">
                    <th className="pb-2 text-left font-bold">Название</th>
                    <th className="pb-2 text-right font-bold">Стоимость</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-2">
              <table className="w-full table-fixed">
                <colgroup>
                  <col />
                  <col className="w-28" />
                </colgroup>
                <tbody className="divide-border divide-y">
                  {order.items.map((orderItem) => (
                    <tr key={orderItem.id}>
                      <td className="py-2">
                        <p className="text-sm">{orderItem.name}</p>
                        {orderItem.description && (
                          <p className="text-muted-foreground text-xs">{orderItem.description}</p>
                        )}
                      </td>
                      <td className="py-2 text-right text-sm">{formatPrice(orderItem.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 pr-2">
              <table className="w-full table-fixed">
                <colgroup>
                  <col />
                  <col className="w-28" />
                </colgroup>
                <tfoot>
                  <tr className="border-border border-t">
                    <td colSpan={2} className="pt-3 text-right">
                      <span className="text-muted-foreground mr-2 text-xs font-bold">Итого:</span>
                      {formatPrice(totalItems)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title="История"
            Icon={History}
            className="flex h-80 min-h-0 flex-col overflow-hidden p-6"
          >
            <ActivityLog activities={order.activities} />
          </SectionCard>
        </div>
      </AnimateIn>
    </div>
  );
}
