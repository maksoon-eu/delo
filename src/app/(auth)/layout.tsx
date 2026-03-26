export default function AuthLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="from-secondary to-background bg-linear-to-br absolute inset-0" />
      <div className="bg-primary/15 h-150 w-150 absolute -right-60 -top-60 rounded-full blur-3xl" />
      <div className="bg-primary/12 h-150 w-150 absolute -bottom-60 -left-60 rounded-full blur-3xl" />
      <div className="absolute left-0 top-0 z-10 p-6">
        <div className="bg-primary/10 border-primary/20 flex h-9 w-9 items-center justify-center rounded-lg border">
          <span className="text-primary text-sm font-bold">Д</span>
        </div>
      </div>
      <div className="relative z-10 flex w-full flex-col items-center">{children}</div>
    </div>
  );
}
