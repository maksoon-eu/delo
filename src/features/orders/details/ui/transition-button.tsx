'use client';

import type { ComponentProps } from 'react';
import { Button } from '@/shared/components/ui/actions/button';
import { cn } from '@/shared/utils/cn';
import type { OrderTransitionAction } from '../types';

type TransitionButtonProps = {
  action: OrderTransitionAction;
  onTransition: (action: OrderTransitionAction) => void;
  size?: ComponentProps<typeof Button>['size'];
  className?: string;
};

export function TransitionButton(props: TransitionButtonProps) {
  const { action, onTransition, size, className } = props;

  function handleClick() {
    onTransition(action);
  }

  return (
    <Button
      variant={action.destructive ? 'destructive' : 'outline'}
      size={size}
      className={cn(!size && '[&_svg]:size-4! rounded-sm px-4 text-sm font-semibold', className)}
      Icon={action.Icon}
      onClick={handleClick}
    >
      {action.label}
    </Button>
  );
}
