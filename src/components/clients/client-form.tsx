'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { IdCard, MessageCircle, User } from 'lucide-react';
import { Form } from '@/components/ui/form/form';
import { SectionCard } from '@/components/ui/data/section-card';
import { FormInput } from '@/components/ui/form/fields/form-input';
import { FormTextarea } from '@/components/ui/form/fields/form-textarea';
import { Button } from '@/components/ui/actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
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
        : { name: '', contact: '', company: '', inn: '', notes: '' },
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
    <Form {...form} onSubmit={handleSubmit(execute)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard title="Клиент" Icon={User}>
          <div className="space-y-4">
            <FormInput control={control} name="name" label="Имя / Название" />
            <FormInput control={control} name="contact" label="Контакт" autoComplete="off" />
          </div>
        </SectionCard>

        <SectionCard title="Реквизиты" Icon={IdCard}>
          <div className="space-y-4">
            <FormInput control={control} name="company" label="Компания" />
            <FormInput control={control} name="inn" label="ИНН" />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Заметки" Icon={MessageCircle}>
        <FormTextarea
          control={control}
          name="notes"
          label="Заметки"
          placeholder="Любые дополнительные сведения..."
          rows={4}
        />
      </SectionCard>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading} Icon={ArrowRightIcon}>
          {props.mode === 'create' ? 'Создать клиента' : 'Сохранить изменения'}
        </Button>
      </div>
    </Form>
  );
}
