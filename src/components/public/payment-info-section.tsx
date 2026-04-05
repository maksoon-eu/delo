import { ContentCard } from '@/components/ui/data/content-card';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { PAYMENT_METHOD_OPTIONS_MAP, PAYMENT_STATUS_LABELS } from '@/constants';
import { cn, formatPrice } from '@/lib/utils';
import type { PublicOrderData } from '@/types';

type PaymentInfoSectionProps = {
  order: PublicOrderData;
};

export function PaymentInfoSection(props: PaymentInfoSectionProps) {
  const { order } = props;

  const { price, paymentMethod, paymentStatus } = order;
  const isPaid = paymentStatus === 'PAID';

  return (
    <AnimateIn variant="slide-up">
      <ContentCard className="bg-card">
        <h2 className="text-foreground mb-4 text-base font-semibold">Оплата</h2>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-x-6 gap-y-1 justify-between">
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
          </div>

          {price !== null && (
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-muted-foreground text-xs font-bold">
                  {isPaid ? 'Оплачено' : 'К оплате'}
                </p>
                <p className="text-foreground text-lg font-bold">
                  {formatPrice(price)}
                </p>
              </div>
            </div>
          )}
        </div>
      </ContentCard>
    </AnimateIn>
  );
}
