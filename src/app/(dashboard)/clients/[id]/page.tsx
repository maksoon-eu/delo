import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { ClientCardContent } from '@/components/clients/client-card-content';
import { getClient } from '@/actions/clients';
import { AnimateIn } from '@/components/ui/feedback/animate-in';

type ClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientPage(props: ClientPageProps) {
  const { params } = props;
  const { id } = await params;
  const client = await getClient(id);

  if (!client) notFound();

  return (
    <div className="page-stack min-h-0 flex-1">
      <PageHeader
        title={client.name}
        description="Карточка клиента"
        showIcon={false}
        backLink={{ href: '/clients', label: 'клиентам' }}
      />

      <AnimateIn className="flex min-h-0 flex-1 flex-col">
        <ClientCardContent client={client} />
      </AnimateIn>
    </div>
  );
}
