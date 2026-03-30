'use client';

import { useState, useRef } from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { Combobox } from '@/components/ui/form/combobox';
import { Button } from '@/components/ui/actions/button';
import { UserRoundPlusIcon } from '@/components/icons/user-round-plus';
import { AppDialog } from '@/components/ui/overlay/dialog';
import { ClientForm } from '@/components/clients/client-form';
import { searchClients } from '@/actions/orders';
import type { OrderInput } from '@/schemas/orders';

const PAGE_SIZE = 20;

type ClientOption = { id: string; name: string };

type FormClientComboboxProps = {
  control: Control<OrderInput>;
  defaultClient?: ClientOption;
};

export function FormClientCombobox(props: FormClientComboboxProps) {
  const { control, defaultClient } = props;
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    defaultClient ? [{ value: defaultClient.id, label: defaultClient.name }] : []
  );
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const onChangeRef = useRef<(value: string) => void>(() => {});
  const queryRef = useRef('');
  const offsetRef = useRef(0);
  const openedRef = useRef(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function loadPage(query: string, offset: number, replace: boolean) {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const results = await searchClients({ query, offset, take: PAGE_SIZE });
      const mapped = results.map((c) => ({ value: c.id, label: c.name }));

      setOptions((prev) => (replace ? mapped : [...prev, ...mapped]));

      setHasMore(results.length === PAGE_SIZE);
      offsetRef.current = offset + results.length;
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handleOpen() {
    if (openedRef.current) return;
    openedRef.current = true;
    queryRef.current = '';
    loadPage('', 0, true);
  }

  function handleInputChange(query: string) {
    queryRef.current = query;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      loadPage(query, 0, true);
    }, 300);
  }

  function handleEndReached() {
    if (!hasMore || isLoadingMore) return;
    loadPage(queryRef.current, offsetRef.current, false);
  }

  function handleCreateSuccess(id: string, name: string) {
    setOptions((prev) => {
      if (prev.find((o) => o.value === id)) return prev;
      return [...prev, { value: id, label: name }].sort((a, b) => a.label.localeCompare(b.label));
    });
    onChangeRef.current(id);
    setCreateOpen(false);
  }

  function handleOpenCreate() {
    setCreateOpen(true);
  }

  return (
    <>
      <FormField
        control={control}
        name="clientId"
        render={({ field }) => {
          onChangeRef.current = field.onChange;
          return (
            <FormItem>
              <FormLabel>Клиент</FormLabel>
              <FormControl>
                <Combobox
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                  onInputChange={handleInputChange}
                  onOpen={handleOpen}
                  onEndReached={handleEndReached}
                  isLoadingMore={isLoadingMore}
                  placeholder="Начните вводить имя..."
                  footer={
                    <Button
                      type="button"
                      variant="ghost"
                      Icon={UserRoundPlusIcon}
                      onClick={handleOpenCreate}
                      className="text-primary w-full justify-start"
                    >
                      Новый клиент
                    </Button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <AppDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Новый клиент"
        description="Добавьте нового клиента в базу"
      >
        <ClientForm mode="create" onSuccess={handleCreateSuccess} />
      </AppDialog>
    </>
  );
}
