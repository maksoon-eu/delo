import type { ClientInput } from '@/shared/schemas/clients';

export type ClientEditorOptions =
  | { mode: 'create'; onSuccess?: (id: string, name: string) => void }
  | { mode: 'edit'; clientId: string; defaultValues: ClientInput; onSuccess?: () => void };
