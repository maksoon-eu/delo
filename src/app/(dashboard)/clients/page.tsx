import { NAV_ITEMS, CLIENTS_PAGE_SIZE } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { ClientsTable } from '@/components/clients/clients-table';
import { getClients } from '@/actions/clients';

const item = NAV_ITEMS[1];

export default async function ClientsPage() {
  const { items, hasMore } = await getClients({ offset: 0, take: CLIENTS_PAGE_SIZE });
  const listKey = items[0]?.id ?? 'empty';

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader Icon={item.Icon} title={item.label} description={item.description} />
      <ClientsTable key={listKey} initialItems={items} initialHasMore={hasMore} />
    </div>
  );
}
