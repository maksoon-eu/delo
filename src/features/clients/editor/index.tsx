'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ClientSchema, type ClientInput } from '@/shared/schemas/clients';
import { createClient, updateClient } from '@/actions/clients';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { CLIENT_CREATE_DEFAULT_VALUES } from './constants';
import type { ClientEditorOptions } from './types';
import { ClientFormView } from './ui/client-form';

type ClientFormProps = ClientEditorOptions;

export function ClientForm(props: ClientFormProps) {
  const { mode, onSuccess } = props;
  const router = useRouter();
  const form = useForm<ClientInput>({
    resolver: zodResolver(ClientSchema),
    defaultValues: mode === 'edit' ? props.defaultValues : CLIENT_CREATE_DEFAULT_VALUES,
  });

  async function onSubmit(data: ClientInput) {
    if (mode === 'create') {
      const result = await createClient(data);
      if ('error' in result) throw new Error(result.error);
      toast.success('Клиент создан');
      router.refresh();
      onSuccess?.(result.id, result.name);
    } else {
      const { error } = await updateClient(props.clientId, data);
      if (error) throw new Error(error);
      toast.success('Клиент обновлён');
      router.refresh();
      onSuccess?.();
    }
  }

  const [execute, isLoading] = useAsyncAction(onSubmit);

  return <ClientFormView mode={props.mode} form={form} isLoading={isLoading} onSubmit={execute} />;
}
