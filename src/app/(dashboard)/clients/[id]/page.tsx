import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';
import { ClientCardContent } from '@/components/clients/client-card-content';
import { BackLink } from '@/components/ui/navigation/back-link';
import { ContentCard } from '@/components/ui/data/content-card';
import { getClient } from '@/actions/clients';
import { AnimateIn } from '@/components/ui/feedback/animate-in';

const item = NAV_ITEMS.clients;

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

      <AnimateIn>
        <ContentCard className="flex flex-col gap-6">
          <BackLink href="/clients" label="клиентам" />

          <ClientCardContent client={client} />
        </ContentCard>
      </AnimateIn>
    </div>
  );
}
