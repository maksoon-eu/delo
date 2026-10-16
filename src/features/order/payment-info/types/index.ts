import type { PublicOrderData } from '@/shared/types/public-orders';

export type PublicOrderSummary = Pick<
  PublicOrderData,
  'status' | 'price' | 'paymentMethod' | 'paymentStatus' | 'totalPaid'
>;
