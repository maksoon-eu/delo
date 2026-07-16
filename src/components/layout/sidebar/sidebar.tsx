'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { PanelLeftCloseIcon } from '@/components/icons/panel-left-close';
import { PanelLeftOpenIcon } from '@/components/icons/panel-left-open';
import { Button } from '@/components/ui/actions/button';
import { useCookieStorage } from '@/hooks/use-cookie-storage';
import { NAV_ITEMS } from '@/constants/navigation';
import { SIDEBAR_COOKIE_KEY } from '@/constants/storage';
import { SidebarNavItem } from './sidebar-item';
import { cn } from '@/utils/cn';

type AppSidebarProps = {
  defaultCollapsed: boolean;
};

export function AppSidebar(props: AppSidebarProps) {
  const { defaultCollapsed } = props;
  const [collapsed, setCollapsed] = useCookieStorage(SIDEBAR_COOKIE_KEY, defaultCollapsed);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 220 }}
      className="relative flex shrink-0 flex-col gap-4 transition-colors"
      initial={false}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div
        className={cn(
          'surface-shadow bg-sidebar border-sidebar-border min-h-20.5 relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 sm:px-5',
          collapsed && 'justify-center'
        )}
      >
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg text-base font-extrabold">
          Д
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              animate={{ opacity: 1, width: 'auto' }}
              className="text-sidebar-foreground overflow-hidden whitespace-nowrap text-xl font-bold"
              exit={{ opacity: 0, width: 0 }}
              initial={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              Delo
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="surface-shadow bg-sidebar border-sidebar-border flex flex-1 flex-col gap-1 rounded-2xl border py-3">
        {Object.values(NAV_ITEMS)
          .filter((item) => !item.isDisabled)
          .map((item) => (
            <SidebarNavItem key={item.href} {...item} collapsed={collapsed} pathname={pathname} />
          ))}
      </nav>

      <div className="surface-shadow bg-sidebar border-sidebar-border rounded-2xl border p-2">
        <Button
          Icon={collapsed ? PanelLeftOpenIcon : PanelLeftCloseIcon}
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-11 w-full rounded-xl border-none bg-transparent"
          onClick={toggle}
          mode="icon"
          tooltip={collapsed ? 'Развернуть' : 'Свернуть'}
          variant="outline"
        />
      </div>
    </motion.aside>
  );
}
