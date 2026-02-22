import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ChatWidget } from '@/components/ChatWidget';
import { Footer } from '@/components/Footer';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MATURITYOS — AI & Data Maturity Audit',
  description: 'Multi-agent company maturity assessment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className={sourceSans.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}

