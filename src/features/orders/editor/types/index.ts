import type { OrderInput } from '@/shared/schemas/orders';

export type ClientOption = { id: string; name: string };

export type OrderEditorOptions =
  | { mode: 'create'; onSuccess?: (id: string) => void }
  | {
      mode: 'edit';
      orderId: string;
      defaultClient: ClientOption;
      defaultValues: OrderInput;
      onSuccess?: () => void;
    };
