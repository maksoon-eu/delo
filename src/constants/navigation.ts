import type { NavItem, NavItemKey } from '@/types/navigation';
import { FileTextIcon } from '@/components/icons/file-text';
import { HomeIcon } from '@/components/icons/home';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UserIcon } from '@/components/icons/user';
import { UsersIcon } from '@/components/icons/users';
import { XIcon } from '@/components/icons/x';

export const NAV_ITEMS: Record<NavItemKey, NavItem> = {
  main: {
    href: '/',
    label: 'Главная',
    description: 'Обзор ключевых показателей и последних активностей',
    Icon: HomeIcon,
  },
  clients: {
    href: '/clients',
    label: 'Клиенты',
    pageTitle: 'Клиенты',
    description: 'Управляйте своей базой контактов и компаний',
    Icon: UsersIcon,
  },
  orders: {
    href: '/orders',
    label: 'Заказы',
    description: 'Отслеживайте заказы, статусы и оплаты',
    Icon: FileTextIcon,
  },
  reports: {
    href: '/reports',
    label: 'Отчёты',
    description: 'Анализируйте доходы и статистику по периодам',
    Icon: TrendingUpIcon,
  },
  profile: {
    href: '/profile',
    label: 'Профиль',
    description: 'Настройки профиля, реквизиты и подтверждение email',
    Icon: UserIcon,
  },
  notFound: {
    href: '/',
    label: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует или была удалена',
    Icon: XIcon,
    isDisabled: true,
  },
};
