import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatGPTButton from '@/components/ChatGPTButton';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PGS Agency - Hệ Thống Marketing Tổng Thể Tăng Trưởng Doanh Thu Bền Vững',
  description: 'PGS Agency xây dựng hệ thống Marketing tổng thể kết hợp Website, SEO, Google Ads, Facebook Ads, TikTok Ads, Content, Social Media giúp doanh nghiệp tăng lead, tối ưu chi phí.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-[#FAF9F6] text-[#1C1C1C] selection:bg-[#D4AF37]/20 selection:text-[#1C1C1C] min-h-screen antialiased overflow-x-hidden">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatGPTButton />
      </body>
    </html>
  );
}