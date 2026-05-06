'use client';

import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { Button } from '@/components/ui/actions/button';
import { UserRoundPlusIcon } from '@/components/icons/user-round-plus';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { ClientForm } from '@/components/clients/client-form';
import { searchClients } from '@/actions/orders';
import type { OrderInput } from '@/schemas/orders';
import {
  FormCombobox,
  type FormComboboxLoadOptionsParams,
} from '@/components/ui/form/fields/form-combobox';
import type { SelectOption } from '@/types';
import { NAV_ITEMS } from '@/constants';

const item = NAV_ITEMS.clients;

type ClientOption = { id: string; name: string };

type FormClientComboboxProps = {
  control: Control<OrderInput>;
  defaultClient?: ClientOption;
};

export function FormClientCombobox(props: FormClientComboboxProps) {
  const { control, defaultClient } = props;
  const [createOpen, setCreateOpen] = useState(false);
  const [createdOption, setCreatedOption] = useState<SelectOption | undefined>();

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
        layer="nested"
        Icon={item.Icon}
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </>
  );
}
