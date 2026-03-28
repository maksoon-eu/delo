import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';

const item = NAV_ITEMS[1];

export default function ClientsPage() {
  return (
    <div>
      <PageHeader Icon={item.Icon} title={item.label} description={item.description} />
    </div>
  );
}
