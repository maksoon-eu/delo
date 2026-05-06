import { EmptyList } from '@/components/ui/feedback/empty-list';
import { DetailItem } from '@/components/ui/data/detail-item';
import { PaymentFormDialog } from '@/components/orders/payment-form-dialog';
import { PAYMENT_STATUS_LABELS } from '@/constants';
import { formatDate, formatPrice } from '@/lib/utils';
import type { PaymentEntry } from '@/types';
import type { PaymentStatus } from '@prisma/client';

type PaymentsSectionProps = {
  orderId: string;
  payments: PaymentEntry[];
  paymentStatus: PaymentStatus;
  orderPrice: number | null;
};

export function PaymentsSection(props: PaymentsSectionProps) {
  const { orderId, payments, paymentStatus, orderPrice } = props;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Оплата</h2>
        <PaymentFormDialog orderId={orderId} />
      </div>

      <dl className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm">
        <DetailItem label="Статус">
          {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
        </DetailItem>
        {orderPrice != null && <DetailItem label="Стоимость">{formatPrice(orderPrice)}</DetailItem>}
      </dl>

      <div className="border-border border-y py-3">
        <EmptyList items={payments} message="Платежей пока нет">
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="border-border flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{formatPrice(payment.amount)}</p>
                  {payment.note && <p className="text-muted-foreground text-xs">{payment.note}</p>}
                </div>
                <p className="text-muted-foreground text-xs font-bold">
                  {formatDate(payment.paidAt)}
                </p>
              </div>
            ))}
          </div>
        </EmptyList>
      </div>

      <div className="flex flex-wrap justify-between gap-x-6">
        <DetailItem label="Оплачено">{formatPrice(totalPaid)}</DetailItem>

        {orderPrice != null && (
          <DetailItem label="Остаток">
            {formatPrice(Math.max(0, orderPrice - totalPaid))}
          </DetailItem>
        )}
      </div>
    </div>
  );
}
