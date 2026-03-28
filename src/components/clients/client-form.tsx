'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form/form';
import { FormInput } from '@/components/ui/form/form-input';
import { Textarea } from '@/components/ui/form/textarea';
import { Button } from '@/components/ui/actions/button';
import { UserIcon } from '@/components/icons/user';
import { AtSignIcon } from '@/components/icons/at-sign';
import { ArrowRightIcon } from '@/components/icons/arrow-right';
import { ClientSchema, type ClientInput } from '@/schemas/clients';
import { createClient, updateClient } from '@/actions/clients';
import { useAsyncAction } from '@/hooks/use-async-action';

type ClientFormProps =
  | { mode: 'create'; onSuccess?: () => void }
  | { mode: 'edit'; clientId: string; defaultValues: ClientInput; onSuccess?: () => void };

export function ClientForm(props: ClientFormProps) {
  const router = useRouter();

  const form = useForm<ClientInput>({
    resolver: zodResolver(ClientSchema),
    defaultValues:
      props.mode === 'edit'
        ? props.defaultValues
        : { name: '', email: '', phone: '', company: '', inn: '', notes: '' },
  });

  const { control, handleSubmit } = form;

  async function onSubmit(data: ClientInput) {
    if (props.mode === 'create') {
      const { error } = await createClient(data);
      if (error) throw new Error(error);
      toast.success('Клиент создан');
      router.refresh();
      props.onSuccess?.();
    } else {
      const { error } = await updateClient(props.clientId, data);
      if (error) throw new Error(error);
      toast.success('Клиент обновлён');
      router.refresh();
      props.onSuccess?.();
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
          <FormInput control={control} name="phone" label="Телефон" type="tel" autoComplete="tel" />
          <FormInput control={control} name="company" label="Компания" />
          <FormInput control={control} name="inn" label="ИНН" />
        </div>

        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заметки</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Любые дополнительные сведения..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
