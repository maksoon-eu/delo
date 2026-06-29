import { NAV_ITEMS } from '@/constants/navigation';
import { PageHeader } from '@/components/layout/page-header';

const item = NAV_ITEMS.main;

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader Icon={item.Icon} title={item.label} description={item.description} />
    </div>
  );
}
