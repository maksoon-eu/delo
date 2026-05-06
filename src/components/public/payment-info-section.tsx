import { CircleDollarSign } from 'lucide-react';
import { ContentCard } from '@/components/ui/data/content-card';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import { PAYMENT_METHOD_OPTIONS_MAP, PAYMENT_STATUS_LABELS } from '@/constants';
import { cn, formatDate, formatPrice } from '@/lib/utils';
import type { PublicOrderData } from '@/types';

type PaymentInfoSectionProps = {
  order: PublicOrderData;
};

export function PaymentInfoSection(props: PaymentInfoSectionProps) {
  const { order } = props;

  const { price, paymentMethod, paymentStatus, payments, totalPaid } = order;
  const isPaid = paymentStatus === 'PAID';
  const remaining = price != null ? Math.max(0, price - totalPaid) : null;

  return (
    <AnimateIn variant="slide-up">
      <ContentCard className="bg-card">
        <h2 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
          <CircleDollarSign className="size-4" />
          Оплата
        </h2>

        <div className="space-y-4">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-3">
            <div>
              <p className="text-muted-foreground text-xs font-bold">Статус</p>
              <p
                className={cn(
                  'text-sm font-medium',
                  isPaid && 'text-green-600 dark:text-green-400',
                  !isPaid && 'text-amber-500 dark:text-amber-400'
                )}
              >
                {PAYMENT_STATUS_LABELS[paymentStatus] ?? paymentStatus}
              </p>
            </div>
            {paymentMethod && (
              <div>
                <p className="text-muted-foreground text-xs font-bold">Способ оплаты</p>
                <p className="text-sm font-medium">
                  {PAYMENT_METHOD_OPTIONS_MAP[paymentMethod]?.label ?? paymentMethod}
                </p>
              </div>
            )}
            {price != null && (
              <div>
                <p className="text-muted-foreground text-xs font-bold">Сумма заказа</p>
                <p className="text-sm font-medium">{formatPrice(price)}</p>
              </div>
            )}
          </div>

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
                      {payment.note && (
                        <p className="text-muted-foreground text-xs">{payment.note}</p>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs font-bold">
                      {formatDate(payment.paidAt)}
                    </p>
                  </div>
                ))}
              </div>
            </EmptyList>
          </div>

          <div className="flex flex-wrap justify-between gap-x-6 gap-y-3">
            <div>
              <p className="text-muted-foreground text-xs font-bold">Внесено</p>
              <p className="text-sm font-medium">{formatPrice(totalPaid)}</p>
            </div>
            {remaining != null && (
              <div>
                <p className="text-muted-foreground text-xs font-bold">Остаток</p>
                <p className="text-sm font-medium">{formatPrice(remaining)}</p>
              </div>
            )}
          </div>
        </div>
      </ContentCard>
    </AnimateIn>
  );
}
