import type { Metadata } from 'next';
import { Archivo, Space_Mono } from 'next/font/google';
import { I18nProvider } from '../lib/i18n';
import LanguageSync from '../components/LanguageSync';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-d' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-m' });

export const metadata: Metadata = {
  title: 'Muhamad Dafin Al Dzaky - Full-Stack Web Developer',
  description: 'Full-stack developer using Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, and Node.js, with IT support experience.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${mono.variable}`}>
        <I18nProvider><LanguageSync />{children}</I18nProvider>
      </body>
    </html>
  );
}
