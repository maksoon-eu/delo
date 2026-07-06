import Link from 'next/link';
import { LEGAL_PRIVACY_PATH, LEGAL_TERMS_PATH } from '@/constants/legal';

export function Footer() {
  return (
    <footer className="border-border mt-auto border-t py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Дело</p>
        <div className="text-muted-foreground flex flex-wrap justify-center gap-4 text-sm sm:gap-6">
          <Link href={LEGAL_PRIVACY_PATH} className="hover:text-foreground transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href={LEGAL_TERMS_PATH} className="hover:text-foreground transition-colors">
            Условия использования
          </Link>
        </div>
      </div>
    </footer>
  );
}
