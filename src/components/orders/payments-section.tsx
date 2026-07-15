import { EmptyList } from '@/components/ui/feedback/empty-list';
import { PaymentFormDialog } from '@/components/orders/payment-form-dialog';
import { PAYMENT_STATUS_LABELS } from '@/constants/payments';
import { formatDate, formatPrice } from '@/utils/format';
import type { PaymentEntry } from '@/types/payments';
import type { PaymentStatus } from '@prisma/client';

type PaymentsSectionProps = {
  orderId: string;
  payments: PaymentEntry[];
  paymentStatus: PaymentStatus;
  orderPrice: number;
};

export function PaymentsSection(props: PaymentsSectionProps) {
  const { orderId, payments, paymentStatus, orderPrice } = props;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, orderPrice - totalPaid);
  const progressValue = Math.min(totalPaid, orderPrice);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <h2 className="font-semibold">Оплата</h2>
        <PaymentFormDialog orderId={orderId} />
      </div>

      <div className="mt-5 shrink-0 space-y-3">
        <dl className="grid grid-cols-2 gap-6">
          <div>
            <dt className="text-muted-foreground text-xs uppercase">Стоимость</dt>
            <dd className="mt-1 font-bold">{formatPrice(orderPrice)}</dd>
          </div>
          <div className="text-right">
            <dt className="text-muted-foreground text-xs uppercase">Оплачено</dt>
            <dd className="text-primary mt-1 font-bold">{formatPrice(totalPaid)}</dd>
          </div>
        </dl>

        <progress
          className="bg-muted [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary block h-2 w-full overflow-hidden rounded-full border-0"
          value={progressValue}
          max={Math.max(orderPrice, 1)}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
          </span>
          <span className={remaining > 0 ? 'text-destructive' : 'text-primary'}>
            {remaining > 0 ? `Остаток: ${formatPrice(remaining)}` : 'Оплачено полностью'}
          </span>
        </div>
      </div>

      <div className="border-border mt-4 min-h-0 flex-1 overflow-y-auto border-t pr-2 pt-4">
        <EmptyList items={payments} message="Платежей пока нет">
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="border-border flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{payment.note || 'Оплата'}</p>
                </div>
                <div className="ml-4 shrink-0 text-right">
                  <p className="font-semibold">{formatPrice(payment.amount)}</p>
                  <p className="text-muted-foreground text-xs">{formatDate(payment.paidAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </EmptyList>
      </div>
    </div>
  );
}
