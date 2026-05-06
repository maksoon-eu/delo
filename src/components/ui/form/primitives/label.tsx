'use client';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

function Label(props: ComponentProps<'label'>) {
  const { className, ...rest } = props;

  return (
    <label
      data-slot="label"
      className={cn(
        'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className
      )}
      {...rest}
    />
  );
}

export { Label };
