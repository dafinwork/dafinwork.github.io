'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export const I18N_EN: Record<string, string> = {
  'nav.works': 'Works',
  'nav.systems': 'Systems',
  'nav.experience': 'Experience',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.guestbook': 'Jejak',
  'nav.cta': 'Contact me',
  'hero.hi': 'Hi',
  'hero.there': 'there',
  'hero.lede': "I'm Muhamad Dafin Al Dzaky, a full-stack developer using Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, and Node.js. I also provide IT support for PC and laptop setup, troubleshooting, and maintenance.",
  'hero.seeWorks': 'See works',
  'hero.email': 'Email me',
  'hero.linkedin': 'LinkedIn',
  'stats.production': 'production sites shipped',
  'stats.roles': 'dev roles, freelance',
  'stats.remote': 'ready to work',
  'side.current': 'Currently',
  'side.currentRole': 'AI & Automation Developer @ KLIK Rekrut',
  'side.currentDesc': 'LinkedIn lead-gen system (Google X-Ray), Gemini + Groq intent filter, Baileys WhatsApp dispatch bot with cron.',
  'side.previous': 'Previously',
  'side.previousDesc': 'WordPress company profile and platform-side web development.',
  'side.history': 'Work history',
  'side.support': 'Full-stack + IT support.',
  'works.title': 'Selected Works.',
  'works.live': 'Live sites',
  'works.view': 'View project',
  'systems.title': 'Systems.',
  'systems.subtitle': 'Off-screen work that ships.',
  'systems.bot.title': 'LinkedIn Lead-Gen + WhatsApp Bot',
  'systems.bot.desc': 'Headless by design. 24/7 background worker. Architecture walkthrough and source code available on request.',
  'systems.bot.stack': 'Node.js / Headless',
  'experience.title': 'Experience.',
  'experience.current': 'Current',
  'experience.previous': 'Previous',
  'about.title': 'Profile.',
  'about.bio': 'Bio',
  'about.education': 'Education',
  'about.certs': 'Certs',
  'about.skills': 'Skills',
  'about.code': 'Code',
  'about.tools': 'Tools',
  'about.support': 'IT Support',
  'contact.title': 'Contact',
  'contact.heading': 'Wanna tell me something?',
  'contact.desc': 'Open for full-time, freelance, and project work. Fastest reply: email or WhatsApp. Based in Bekasi Utara.',
  'guestbook.title': 'Jejak',
  'guestbook.heading': 'Tinggalin jejak',
  'guestbook.desc': 'Leave a trace. No account needed.',
  'guestbook.name': 'Name',
  'guestbook.message': 'Message',
  'guestbook.submit': 'Leave a trace',
  'guestbook.loading': 'Loading traces...',
  'guestbook.empty': 'No traces yet. Be the first.',
  'footer.backToTop': 'Back to top',
  'footer.copyright': '© 2026 Muhamad Dafin Al Dzaky.',
};

export const I18N_ID: Record<string, string> = {
  'nav.works': 'Karya',
  'nav.systems': 'Sistem',
  'nav.experience': 'Pengalaman',
  'nav.about': 'Tentang',
  'nav.contact': 'Kontak',
  'nav.guestbook': 'Jejak',
  'nav.cta': 'Hubungi saya',
  'hero.hi': 'Halo',
  'hero.there': 'semua',
  'hero.lede': "Saya Muhamad Dafin Al Dzaky, developer full-stack menggunakan Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, dan Node.js. Saya juga menyediakan dukungan IT untuk setup PC dan laptop, troubleshooting, dan perawatan.",
  'hero.seeWorks': 'Lihat karya',
  'hero.email': 'Email saya',
  'hero.linkedin': 'LinkedIn',
  'stats.production': 'situs produksi yang dikirim',
  'stats.roles': 'peran dev, freelance',
  'stats.remote': 'siap bekerja',
  'side.current': 'Saat ini',
  'side.currentRole': 'AI & Automation Developer @ KLIK Rekrut',
  'side.currentDesc': 'Sistem lead-gen LinkedIn (Google X-Ray), filter intent Gemini + Groq, bot WhatsApp Baileys dengan cron.',
  'side.previous': 'Sebelumnya',
  'side.previousDesc': 'Pengembangan profil perusahaan WordPress dan web sisi platform.',
  'side.history': 'Riwayat kerja',
  'side.support': 'Full-stack + dukungan IT.',
  'works.title': 'Karya Pilihan.',
  'works.live': 'Situs live',
  'works.view': 'Lihat proyek',
  'systems.title': 'Sistem.',
  'systems.subtitle': 'Kerja di balik layar yang dikirim.',
  'systems.bot.title': 'LinkedIn Lead-Gen + WhatsApp Bot',
  'systems.bot.desc': 'Dirancang headless. Worker latar belakang 24/7. Walkthrough arsitektur dan kode sumber tersedia atas permintaan.',
  'systems.bot.stack': 'Node.js / Headless',
  'experience.title': 'Pengalaman.',
  'experience.current': 'Saat ini',
  'experience.previous': 'Sebelumnya',
  'about.title': 'Profil.',
  'about.bio': 'Bio',
  'about.education': 'Pendidikan',
  'about.certs': 'Sertifikat',
  'about.skills': 'Keahlian',
  'about.code': 'Kode',
  'about.tools': 'Alat',
  'about.support': 'Dukungan IT',
  'contact.title': 'Kontak',
  'contact.heading': 'Mau bilang sesuatu?',
  'contact.desc': 'Terbuka untuk kerja full-time, freelance, dan proyek. Balasan tercepat: email atau WhatsApp. Berbasis di Bekasi Utara.',
  'guestbook.title': 'Jejak',
  'guestbook.heading': 'Tinggalin jejak',
  'guestbook.desc': 'Tinggalkan jejak. Tidak perlu akun.',
  'guestbook.name': 'Nama',
  'guestbook.message': 'Pesan',
  'guestbook.submit': 'Tinggalkan jejak',
  'guestbook.loading': 'Memuat jejak...',
  'guestbook.empty': 'Belum ada jejak. Jadilah yang pertama.',
  'footer.backToTop': 'Kembali ke atas',
  'footer.copyright': '© 2026 Muhamad Dafin Al Dzaky.',
};

type C = { lang: 'en' | 'id'; t: (k: string) => string; setLang: (l: 'en' | 'id') => void };
const Ctx = createContext<C>({ lang: 'en', t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, set] = useState<'en' | 'id'>('en');
  useEffect(() => {
    const l = localStorage.getItem('dafin-lang');
    if (l === 'id') set(l);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('dafin-lang', lang);
  }, [lang]);
  const dict = lang === 'id' ? I18N_ID : I18N_EN;
  const t = (k: string) => dict[k] ?? k;
  return <Ctx.Provider value={{ lang, t, setLang: set }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
