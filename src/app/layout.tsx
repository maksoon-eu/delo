import type { Metadata } from 'next';
import { Manrope, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/feedback/sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const manrope = Manrope({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Delo',
  description: 'Управляй клиентами, заказами и документами в одном месте',
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
          <Toaster />

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
