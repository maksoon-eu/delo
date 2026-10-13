'use client';

import type { UseFormReturn } from 'react-hook-form';
import { IdCard, MessageCircle, User } from 'lucide-react';
import { Form } from '@/shared/components/ui/form/form';
import { SectionCard } from '@/shared/components/ui/data/section-card';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import type { ClientInput } from '@/shared/schemas/clients';

type ClientFormViewProps = {
  mode: 'create' | 'edit';
  form: UseFormReturn<ClientInput>;
  isLoading: boolean;
  onSubmit: (data: ClientInput) => Promise<void>;
};

export function ClientFormView(props: ClientFormViewProps) {
  const { form, isLoading, onSubmit } = props;
  const { control, handleSubmit } = form;

  return (
    <Form {...form} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
