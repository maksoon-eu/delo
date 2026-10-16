import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo(props: BrandLogoProps) {
  const { compact = false, className } = props;
  const fileName = compact ? 'logo-short' : 'logo';
  const width = compact ? 184 : 658;
  const height = compact ? 200 : 218;

  return (
    <span role="img" aria-label="Delo" className={cn('inline-flex h-8 w-auto shrink-0', className)}>
      <Image
        src={`/brand/${fileName}-light.svg`}
        alt=""
        width={width}
        height={height}
        className="h-full w-auto dark:hidden"
        loading="eager"
        unoptimized
      />
      <Image
        src={`/brand/${fileName}-dark.svg`}
        alt=""
        width={width}
        height={height}
        className="hidden h-full w-auto dark:block"
        loading="eager"
        unoptimized
      />
    </span>
  );
}
