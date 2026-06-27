import { notFound } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { ClientCardContent } from '@/components/clients/client-card-content';
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
    <div className="page-stack">
      <PageHeader
        Icon={item.Icon}
        title={client.name}
        description="Карточка клиента"
        backLink={{ href: '/clients', label: 'клиентам' }}
      />

      <AnimateIn>
        <ContentCard>
          <ClientCardContent client={client} />
        </ContentCard>
      </AnimateIn>
    </div>
  );
}
