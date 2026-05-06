import { Input } from '@/components/ui/form/primitives/input';
import { Search } from 'lucide-react';
import type { ChangeEvent, ReactNode } from 'react';
import { Button } from '../actions/button';
import { ArrowRightIcon } from '@/components/icons/arrow-right';

type FilterCardProps = {
  children?: ReactNode;
  filterValue: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBtnAction: () => void;
  btnLabel: string;
  inputLabel: string;
};

export function FilterCard(props: FilterCardProps) {
  const { children, filterValue, onFilterChange, onBtnAction, btnLabel, inputLabel } = props;
  return (
    <div className="glass border-glass flex flex-col gap-5 rounded-xl p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder={inputLabel}
            value={filterValue}
            onChange={onFilterChange}
            className="pl-8"
          />
        </div>
        {children}
      </div>
      <Button Icon={ArrowRightIcon} onClick={onBtnAction} className="w-full sm:w-auto">
        {btnLabel}
      </Button>
    </div>
  );
}
