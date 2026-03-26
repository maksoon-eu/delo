export function Footer() {
  return (
    <footer className="border-border/50 mt-auto border-t py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Дело</p>
        <div className="text-muted-foreground flex gap-6 text-sm">
          <a href="#" className="hover:text-foreground transition-colors">
            Политика конфиденциальности
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Условия использования
          </a>
        </div>
      </div>
    </footer>
  );
}
