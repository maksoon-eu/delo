import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { NavItemKey } from '@/types/navigation';

export function useCurrentPage() {
  const pathname = usePathname();

  const segmentPage = pathname.split('/')[1];
  const currentPage = segmentPage.length > 0 ? segmentPage : 'main';

  if (Object.hasOwn(NAV_ITEMS, currentPage)) {
    return NAV_ITEMS[currentPage as NavItemKey];
  }

  return NAV_ITEMS[NavItemKey.NOT_FOUND];
}
