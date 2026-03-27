import type { Metadata } from 'next';
import { Manrope, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/feedback/sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { env } from '@/lib/env';
import { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';

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

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="dashboard-background flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <Footer />

          {env.NODE_ENV === 'production' && <Analytics />}
          {env.NODE_ENV === 'production' && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  );
}
