'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { AnimatedIconHandle, NavItem } from '@/types';

type SidebarNavItemProps = NavItem & { collapsed: boolean; pathname: string };

export function SidebarNavItem(props: SidebarNavItemProps) {
  const { href, label, Icon, collapsed, pathname } = props;
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };
  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <Link
      className={cn(
        'relative flex h-10 items-center gap-3 overflow-hidden rounded-md px-3 text-sm font-medium transition-colors',
        collapsed && 'justify-center',
        isActive
          ? 'bg-sidebar-primary/15 text-sidebar-primary font-semibold'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-primary/15 hover:text-sidebar-accent-foreground'
      )}
      href={href}
      title={collapsed ? label : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isActive && (
        <span className="bg-sidebar-primary absolute inset-y-2 left-0 w-0.5 rounded-r-full" />
      )}
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
