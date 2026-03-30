import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { BackLink } from '@/components/ui/navigation/back-link';
import { Button } from '@/components/ui/actions/button';
import { OrderStatusPanel } from '@/components/orders/order-status-panel';
import { ActivityLog } from '@/components/orders/activity-log';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { DetailItem } from '@/components/ui/data/detail-item';
import { getOrder } from '@/actions/orders';

const item = NAV_ITEMS[2];

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage(props: OrderPageProps) {
  const { params } = props;
  const { id } = await params;

  const order = await getOrder(id);
  if (!order) notFound();

  const totalItems = order.items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        Icon={item.Icon}
        title={order.title}
        description={`Заказ · ${order.clientName}`}
      />
      <AnimateIn className="space-y-5">
        <div className="glass rounded-xl border p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <BackLink href="/orders" label="заказам" />
            <Link href={`/orders/${id}/edit`}>
              <Button variant="outline" size="sm" Icon={ArrowRightIcon}>
                Редактировать
              </Button>
            </Link>
          </div>

          <OrderStatusPanel orderId={order.id} currentStatus={order.status} />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="glass rounded-xl border p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold">Детали заказа</h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <DetailItem label="Клиент">{order.clientName}</DetailItem>
                {order.clientEmail && (
                  <DetailItem label="Email клиента">{order.clientEmail}</DetailItem>
                )}
                {order.startDate && (
                  <DetailItem label="Дата начала">
                    {format(order.startDate, 'd MMM yyyy', { locale: ru })}
                  </DetailItem>
                )}
                {order.deadline && (
                  <DetailItem label="Дедлайн">
                    {format(order.deadline, 'd MMM yyyy', { locale: ru })}
                  </DetailItem>
                )}
                {order.price != null && (
                  <DetailItem label="Стоимость">
                    {order.price.toLocaleString('ru-RU')} {order.currency}
                  </DetailItem>
                )}
                <DetailItem label="Создан">
                  {format(order.createdAt, 'd MMM yyyy', { locale: ru })}
                </DetailItem>
              </dl>
              {order.description && (
                <div className="border-border mt-4 border-t pt-4">
                  <p className="text-muted-foreground mb-1 text-xs">Описание</p>
                  <p className="text-sm">{order.description}</p>
                </div>
              )}
            </div>

            {order.items.length > 0 && (
              <div className="glass rounded-xl border p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold">Состав работ</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-border border-b text-xs">
                        <th className="pb-2 text-left font-medium">Название</th>
                        <th className="pb-2 text-right font-medium">Кол-во</th>
                        <th className="pb-2 text-right font-medium">Ед.</th>
                        <th className="pb-2 text-right font-medium">Цена</th>
                        <th className="pb-2 text-right font-medium">Сумма</th>
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
                          <td className="py-2 text-right">{orderItem.quantity}</td>
                          <td className="text-muted-foreground py-2 text-right">
                            {orderItem.unit || '—'}
                          </td>
                          <td className="py-2 text-right">
                            {orderItem.price.toLocaleString('ru-RU')}
                          </td>
                          <td className="py-2 text-right font-medium">
                            {(orderItem.quantity * orderItem.price).toLocaleString('ru-RU')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-border border-t">
                        <td colSpan={4} className="pt-2 text-right text-sm font-medium">
                          Итого:
                        </td>
                        <td className="pt-2 text-right font-semibold">
                          {totalItems.toLocaleString('ru-RU')} {order.currency}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="glass rounded-xl border p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold">История</h2>
            <ActivityLog activities={order.activities} />
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
