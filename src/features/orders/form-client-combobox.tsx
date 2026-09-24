'use client';

import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { UserRoundPlus } from 'lucide-react';
import { Button } from '@/shared/components/ui/actions/button';
import { UserRoundPlusIcon } from '@/shared/components/icons/user-round-plus';
import { AppDialog } from '@/shared/components/ui/overlay/dialog';
import { ClientForm } from '@/features/clients/client-form';
import { searchClients } from '@/actions/orders';
import type { OrderInput } from '@/shared/schemas/orders';
import {
  FormCombobox,
  type FormComboboxLoadOptionsParams,
} from '@/shared/components/ui/form/fields/form-combobox';
import { useRequireVerifiedEmail } from '@/shared/components/providers/email-verification/email-verification.hook';
import type { SelectOption } from '@/types/forms';

type ClientOption = { id: string; name: string };

type FormClientComboboxProps = {
  control: Control<OrderInput>;
  defaultClient?: ClientOption;
};

export function FormClientCombobox(props: FormClientComboboxProps) {
  const { control, defaultClient } = props;
  const [createOpen, setCreateOpen] = useState(false);
  const [createdOption, setCreatedOption] = useState<SelectOption | undefined>();
  const requireVerifiedEmail = useRequireVerifiedEmail();

  const defaultOption = defaultClient
    ? { value: defaultClient.id, label: defaultClient.name }
    : undefined;
  const defaultOptions = defaultOption ? [defaultOption] : [];

  async function loadOptions(params: FormComboboxLoadOptionsParams) {
    const { query, offset, take } = params;
    const results = await searchClients({ query, offset, take });

    return results.map((client) => ({ value: client.id, label: client.name }));
  }

  function handleOpenCreate() {
    if (!requireVerifiedEmail()) return;

    setCreateOpen(true);
  }

  function handleCreateSuccess(id: string, name: string) {
    setCreatedOption({ value: id, label: name });
    setCreateOpen(false);
  }

  return (
    <>
      <FormCombobox
        control={control}
        name="clientId"
        label="Клиент"
        loadOptions={loadOptions}
        defaultOption={defaultOption}
        defaultOptions={defaultOptions}
        createdOption={createdOption}
        action={
          <Button
            type="button"
            variant="ghost"
            Icon={UserRoundPlusIcon}
            onClick={handleOpenCreate}
            className="text-primary w-full justify-center"
          >
            Новый клиент
          </Button>
        }
      />

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
        Icon={UserRoundPlus}
        size="lg"
        layer="nested"
        variant="solid"
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </>
  );
}
