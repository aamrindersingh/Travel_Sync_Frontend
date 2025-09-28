// server
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Header from '@/components/ui/Header.server';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelSync - Find Your Perfect Travel Companions',
  description: 'Connect with fellow travelers and create unforgettable journeys together.',
  keywords: ['travel', 'companions', 'matching', 'nextjs', 'react'],
  authors: [{ name: 'TravelSync Team' }],
  openGraph: {
    title: 'TravelSync - Find Your Perfect Travel Companions',
    description: 'Connect with fellow travelers and create unforgettable journeys together.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelSync - Find Your Perfect Travel Companions',
    description: 'Connect with fellow travelers and create unforgettable journeys together.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800`}>
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <Header />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}