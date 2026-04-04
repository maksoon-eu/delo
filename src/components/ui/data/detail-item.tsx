import { ReactNode } from 'react';

type DetailItemProps = {
  label: string;
  children: ReactNode;
};

export function DetailItem(props: DetailItemProps) {
  const { label, children } = props;
  return (
    <div>
      <dt className="text-muted-foreground text-xs font-bold">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}
