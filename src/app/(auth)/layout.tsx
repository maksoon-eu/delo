import type { ReactNode } from 'react';

export default function AuthLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="absolute left-0 top-0 z-10 p-6">
        <div className="bg-primary/10 border-primary/20 flex h-9 w-9 items-center justify-center rounded-lg border">
          <span className="text-primary text-sm font-bold">Д</span>
        </div>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center">{children}</div>
    </div>
  );
}
