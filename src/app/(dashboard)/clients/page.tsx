import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { ClientsTable } from '@/components/clients/clients-table';
import { getClients } from '@/actions/clients';

const item = NAV_ITEMS[1];

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <PageHeader Icon={item.Icon} title={item.label} description={item.description} />
      <ClientsTable clients={clients} />
    </div>
  );
}
