import type { Route } from 'next';
import Link from 'next/link';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import type { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  description: string;
  formTitle: string;
  footerText: string;
  footerLinkHref: Route;
  forgotPasswordHref?: Route;
  children: ReactNode;
};

export function AuthCard(props: AuthCardProps) {
  const {
    title,
    description,
    formTitle,
    footerText,
    footerLinkHref,
    forgotPasswordHref,
    children,
  } = props;

  return (
    <AnimateIn className="w-full max-w-sm">
      <div className="surface-shadow glass border-glass rounded-xl">
        <div className="flex flex-col gap-1 p-6 pb-4">
          <h1 className="text-primary text-2xl font-bold leading-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="px-6 pb-2">
          <div className="border-border border-t" />
        </div>

        <div className="px-6 pb-2 pt-4">
          <p className="text-foreground text-sm font-medium">{formTitle}</p>
        </div>

        <div className="px-6 pb-6">{children}</div>

        <div className="border-border border-t px-6 py-4 text-center">
          <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <Link href={footerLinkHref} className="text-primary hover:underline">
              {footerText}
            </Link>
            {forgotPasswordHref && (
              <Link href={forgotPasswordHref} className="text-primary hover:underline">
                Забыли пароль?
              </Link>
            )}
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
