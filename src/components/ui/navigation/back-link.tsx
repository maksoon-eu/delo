import Link from 'next/link';
import type { Route } from 'next';
import { Button } from '../actions/button';
import { ArrowLeftIcon } from '@/components/icons/arrow-left';

type BackLinkProps = {
  href: Route;
  label: string;
};

export function BackLink(props: BackLinkProps) {
  const { href, label } = props;

  return (
    <Link href={href} className="text-primary text-sm hover:underline">
      <Button variant="outline" tooltip={`Вернуться к ${label}`} Icon={ArrowLeftIcon} />
    </Link>
  );
}
