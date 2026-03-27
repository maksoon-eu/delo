import Link from 'next/link';
import { AnimateIn } from '@/components/ui/feedback/animate-in';
import { ShieldCheck, LockKeyholeOpen } from 'lucide-react';
import { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  description: string;
  formTitle: string;
  footerText: string;
  footerLinkHref: string;
  forgotPasswordHref?: string;
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
      <div className="rounded-xl border shadow-sm backdrop-blur-[100px]">
        <div className="space-y-1 p-6 pb-4">
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

        <div className="border-border border-t px-6 py-4">
          <div className="text-muted-foreground flex items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} />
              Data Protected
            </span>
            <span className="bg-border h-3 w-px" />
            <span className="flex items-center gap-1">
              <LockKeyholeOpen size={13} />
              SSL Secured
            </span>
          </div>
        </div>

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
