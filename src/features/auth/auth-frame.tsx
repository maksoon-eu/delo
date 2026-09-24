import type { ReactNode } from 'react';
import { AUTH_FEATURES } from '@/constants/auth';

type AuthFrameProps = {
  children: ReactNode;
};

export function AuthFrame(props: AuthFrameProps) {
  const { children } = props;

  return (
    <main className="bg-background text-foreground dark min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="bg-linear-to-br from-background via-primary/15 to-background min-h-90 relative isolate flex flex-col justify-between overflow-hidden p-8 sm:p-12 lg:min-h-screen lg:p-24">
          <div className="bg-primary/25 absolute -left-20 bottom-14 size-72 rounded-full blur-2xl" />
          <div className="bg-primary/20 absolute bottom-32 left-28 size-28 rounded-full blur-xl" />
          <div className="bg-primary/20 absolute -bottom-24 left-16 size-40 rounded-full blur-xl" />
          <div className="bg-primary/20 size-128 absolute -right-48 top-20 rounded-full blur-3xl" />

          <div className="relative z-10 flex max-w-md flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-2xl text-3xl font-extrabold">
                D
              </div>
              <p className="text-foreground text-3xl font-extrabold">Delo</p>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-foreground text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                Управляй
                <br /> проектами с умом
              </h1>
              <p className="text-muted-foreground max-w-md text-base leading-6">
                Клиенты, заказы и финансы - всё в одном месте.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {AUTH_FEATURES.map((feature) => {
                const { Icon } = feature;

                return (
                  <div
                    key={feature.label}
                    className="border-border bg-secondary/60 text-foreground flex items-center gap-2.5 rounded-full border px-3.5 py-2.5 text-sm font-semibold backdrop-blur"
                  >
                    <Icon size={16} className="text-primary" aria-hidden />
                    {feature.label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-background flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-24">
          <div className="max-w-120 w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}
