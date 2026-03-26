'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/actions/button';
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

type AnimatedIconComponent = React.ComponentType<{
  size?: number;
  ref?: React.Ref<AnimatedIconHandle>;
}>;

type IconButtonProps = ComponentProps<typeof Button> & {
  isLoading?: boolean;
  Icon?: AnimatedIconComponent;
};

export function IconButton(props: IconButtonProps) {
  const { isLoading, Icon, children, disabled, ...rest } = props;
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <Button
      {...rest}
      disabled={disabled || isLoading}
      onMouseEnter={() => {
        if (!isLoading) iconRef.current?.startAnimation();
      }}
      onMouseLeave={() => {
        if (!isLoading) iconRef.current?.stopAnimation();
      }}
    >
      {isLoading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        Icon && <Icon size={18} ref={iconRef} />
      )}
      {children}
    </Button>
  );
}
