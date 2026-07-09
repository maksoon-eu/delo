import { CLIENTS_PAGE_SIZE } from '@/constants/pagination';
import { PageHeader } from '@/components/layout/page-header';
import { ClientsTable } from '@/components/clients/clients-table';
import { getClients } from '@/actions/clients';

export default async function ClientsPage() {
  const { items, hasMore } = await getClients({ offset: 0, take: CLIENTS_PAGE_SIZE });
  const listKey = items[0]?.id ?? 'empty';

  return (
    <div className="page-stack flex-1">
      <PageHeader />
      <ClientsTable key={listKey} initialItems={items} initialHasMore={hasMore} />
    </div>
  );
}
