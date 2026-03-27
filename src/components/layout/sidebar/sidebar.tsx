'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { PanelLeftCloseIcon } from '@/components/icons/panel-left-close';
import { PanelLeftOpenIcon } from '@/components/icons/panel-left-open';
import { Button } from '@/components/ui/actions/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { NAV_ITEMS, SIDEBAR_STORAGE_KEY } from '@/constants';
import { SidebarNavItem } from './sidebar-item';

export function AppSidebar() {
  const [collapsed, setCollapsed] = useLocalStorage(SIDEBAR_STORAGE_KEY, false);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      className="border-sidebar-border bg-sidebar relative flex shrink-0 flex-col border-r transition-colors"
      initial={false}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div className="border-sidebar-border flex h-14 shrink-0 items-center gap-2.5 overflow-hidden border-b px-3">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold">
          Д
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              animate={{ opacity: 1, width: 'auto' }}
              className="text-sidebar-foreground overflow-hidden whitespace-nowrap text-sm font-semibold"
              exit={{ opacity: 0, width: 0 }}
              initial={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              Delo
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} {...item} collapsed={collapsed} pathname={pathname} />
        ))}
      </nav>

      <div className="border-sidebar-border border-t p-2">
        <Button
          Icon={collapsed ? PanelLeftOpenIcon : PanelLeftCloseIcon}
          className="w-full"
          onClick={toggle}
          mode="icon"
          tooltip={collapsed ? 'Развернуть' : 'Свернуть'}
          variant="ghost"
        />
      </div>
    </motion.aside>
  );
}
