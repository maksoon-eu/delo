import { CircleCheck, CircleDollarSign, Clock3 } from 'lucide-react';
import { ConfirmOrderButton } from '@/components/features/order/confirm-order-button';
import { PublicPaymentItem } from '@/components/features/order/public-payment-item';
import { Badge } from '@/components/ui/data/badge';
import { DetailItem } from '@/components/ui/data/detail-item';
import { SectionCard } from '@/components/ui/data/section-card';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import { PAYMENT_METHOD_OPTIONS_MAP, PAYMENT_STATUS_LABELS } from '@/constants/payments';
import { formatPrice } from '@/utils/format';
import type { PublicOrderData } from '@/types/public-orders';

type PaymentInfoSectionProps = {
  order: PublicOrderData;
  token: string;
};

export function PaymentInfoSection(props: PaymentInfoSectionProps) {
  const { order, token } = props;

  const { price, paymentMethod, paymentStatus, payments, totalPaid } = order;
  const isPaid = paymentStatus === 'PAID';
  const remaining = Math.max(0, price - totalPaid);

  return (
    <SectionCard
      title="Оплата"
      Icon={CircleDollarSign}
      action={
        <Badge
          variant={isPaid ? 'accent' : 'secondary'}
          size="sm"
          Icon={isPaid ? CircleCheck : Clock3}
        >
          {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
        </Badge>
      }
      className="flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 [&_dd]:mt-1 [&_dt]:uppercase">
            {paymentMethod && (
              <DetailItem label="Способ оплаты">
                {PAYMENT_METHOD_OPTIONS_MAP[paymentMethod]?.label ?? paymentMethod}
              </DetailItem>
            )}
            <DetailItem label="Сумма заказа">{formatPrice(price)}</DetailItem>
          </dl>

          <div className="border-border flex min-h-0 flex-1 flex-col border-y py-4">
            <EmptyList items={payments} message="Платежей пока нет">
              <div className="flex min-h-0 w-full flex-1 flex-col">
                <div className="text-muted-foreground mb-2 grid grid-cols-[1fr_auto] gap-x-4 text-xs font-bold">
                  <span>Сумма</span>
                  <span className="text-right">Дата</span>
                </div>
                <div className="min-h-0 w-full flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {payments.map((payment) => (
                      <PublicPaymentItem key={payment.id} payment={payment} />
                    ))}
                  </div>
                </div>
              </div>
            </EmptyList>
          </div>
        </div>

        <div className="space-y-5">
          <dl className="bg-muted/40 flex w-full items-start justify-between gap-6 rounded-xl p-4 [&_dd]:mt-1 [&_dt]:uppercase">
            <DetailItem label="Внесено">{formatPrice(totalPaid)}</DetailItem>
            <DetailItem label="Остаток" className="text-right">
              <span className="text-primary font-semibold">{formatPrice(remaining)}</span>
            </DetailItem>
          </dl>

          {order.status === 'SENT' && (
            <div className="border-primary/20 bg-primary/5 rounded-xl border p-4">
              <p className="text-muted-foreground mb-4 text-sm leading-6">
                Подтвердите, что ознакомились с составом заказа, стоимостью и условиями работы.
              </p>
              <ConfirmOrderButton token={token} />
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
