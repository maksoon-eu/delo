import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { ClientCardContent } from '@/components/features/clients/client-card-content';
import { getClient } from '@/actions/clients';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { RETURN_TO } from '@/constants/navigation';
import { getBackLink } from '@/utils/navigation';

type ClientPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [RETURN_TO]?: string | string[] }>;
};

export default async function ClientPage(props: ClientPageProps) {
  const { params, searchParams } = props;
  const { id } = await params;
  const query = await searchParams;
  const backLink = getBackLink(query[RETURN_TO], '/clients');

  const client = await getClient(id);

  if (!client) notFound();

  return (
    <div className="page-stack min-h-0 flex-1">
      <PageHeader
        title={client.name}
        description="Карточка клиента"
        showIcon={false}
        backLink={{ href: backLink, label: 'клиентам' }}
      />

      <AnimateIn className="flex min-h-0 flex-1 flex-col">
        <ClientCardContent client={client} />
      </AnimateIn>
    </div>
  );
}
