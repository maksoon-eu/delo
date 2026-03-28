import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { ClientCardContent } from '@/components/clients/client-card-content';
import { BackLink } from '@/components/ui/navigation/back-link';
import { getClient } from '@/actions/clients';
import { AnimateIn } from '@/components/ui/feedback/animate-in';

const item = NAV_ITEMS[1];

type ClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientPage(props: ClientPageProps) {
  const { params } = props;
  const { id } = await params;
  const client = await getClient(id);

  if (!client) notFound();

  return (
    <div className="space-y-6">
      <PageHeader Icon={item.Icon} title={client.name} description="Карточка клиента" />

      <AnimateIn className="glass flex flex-col gap-6 rounded-xl border p-5 shadow-sm">
        <BackLink href="/clients" label="клиентам" />

        <ClientCardContent client={client} />
      </AnimateIn>
    </div>
  );
}
