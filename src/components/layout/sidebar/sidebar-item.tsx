'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { startAnimatedIcon, stopAnimatedIcon } from '@/utils/animation';
import { cn } from '@/utils/cn';
import type { AnimatedIconHandle } from '@/types/icons';
import type { NavItem } from '@/types/navigation';

type SidebarNavItemProps = NavItem & { collapsed: boolean; pathname: string };

export function SidebarNavItem(props: SidebarNavItemProps) {
  const { href, label, Icon, collapsed, pathname } = props;
  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  const iconRef = useRef<AnimatedIconHandle>(null);

  function handleMouseEnter() {
    startAnimatedIcon(iconRef);
  }

  function handleMouseLeave() {
    stopAnimatedIcon(iconRef);
  }

  return (
    <Link
      className={cn(
        'relative mx-2 flex h-11 items-center gap-3 overflow-hidden rounded-xl border-l-[3px] px-4 text-sm font-medium transition-colors',
        collapsed && 'justify-center px-0',
        isActive
          ? 'border-sidebar-primary bg-sidebar-primary/20 text-sidebar-foreground font-semibold'
          : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-transparent'
      )}
      href={href}
      title={collapsed ? label : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="shrink-0">
        <Icon ref={iconRef} size={18} />
      </span>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            animate={{ opacity: 1, width: 'auto' }}
            className="overflow-hidden whitespace-nowrap"
            exit={{ opacity: 0, width: 0 }}
            initial={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
