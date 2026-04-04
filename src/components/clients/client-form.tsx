'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { Button } from '@/components/ui/actions/button';
import { UserIcon } from '@/components/icons/user';
import { AtSignIcon } from '@/components/icons/at-sign';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { MessageCircleIcon } from '@/components/icons/message-circle';
import { MapPinIcon } from '@/components/icons/map-pin';
import { IdCardIcon } from '@/components/icons/id-card';
import { ClientSchema, type ClientInput } from '@/schemas/clients';
import { createClient, updateClient } from '@/actions/clients';
import { useAsyncAction } from '@/hooks/use-async-action';

type ClientFormProps =
  | { mode: 'create'; onSuccess?: (id: string, name: string) => void }
  | { mode: 'edit'; clientId: string; defaultValues: ClientInput; onSuccess?: () => void };

export function ClientForm(props: ClientFormProps) {
  const { mode, onSuccess } = props;
  const router = useRouter();

  const form = useForm<ClientInput>({
    resolver: zodResolver(ClientSchema),
    defaultValues:
      mode === 'edit'
        ? props.defaultValues
        : { name: '', email: '', phone: '', company: '', inn: '', notes: '' },
  });

  const { control, handleSubmit } = form;

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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(execute)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormInput control={control} name="name" label="Имя / Название" Icon={UserIcon} />
          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            Icon={AtSignIcon}
          />
          <FormInput
            control={control}
            name="phone"
            label="Телефон"
            type="tel"
            autoComplete="tel"
            Icon={MessageCircleIcon}
          />
          <FormInput control={control} name="company" label="Компания" Icon={MapPinIcon} />
          <FormInput control={control} name="inn" label="ИНН" Icon={IdCardIcon} />
        </div>

        <FormTextarea
          control={control}
          name="notes"
          label="Заметки"
          placeholder="Любые дополнительные сведения..."
        />

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
            {props.mode === 'create' ? 'Создать клиента' : 'Сохранить изменения'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
