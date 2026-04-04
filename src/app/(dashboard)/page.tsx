import { NAV_ITEMS } from '@/constants';
import { PageHeader } from '@/components/layout/page-header';

const item = NAV_ITEMS.main;

export default function DashboardPage() {
  return (
    <div>
      <PageHeader Icon={item.Icon} title={item.label} description={item.description} />
    </div>
  );
}
