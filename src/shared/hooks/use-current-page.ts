import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { DASHBOARD_ROUTE } from '@/constants/routes';
import { NavItemKey } from '@/types/navigation';

export function useCurrentPage() {
  const pathname = usePathname();

  const segmentPage = pathname.split('/')[1];
  const currentPage =
    pathname === DASHBOARD_ROUTE || segmentPage.length === 0 ? NavItemKey.MAIN : segmentPage;

  if (Object.hasOwn(NAV_ITEMS, currentPage)) {
    return NAV_ITEMS[currentPage as NavItemKey];
  }

  return NAV_ITEMS[NavItemKey.NOT_FOUND];
}
