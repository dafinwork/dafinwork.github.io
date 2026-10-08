'use client';

import { useEffect } from 'react';
import { useI18n } from '../lib/i18n';

const translations: Record<string, string> = {
  'Skip to works': 'Lewati ke karya', Works: 'Karya', Systems: 'Sistem', Experience: 'Pengalaman', About: 'Tentang', Contact: 'Kontak', Jejak: 'Jejak',
  'Hi': 'Halo', there: 'semua', 'See works': 'Lihat karya', 'Email me': 'Email saya',
  'production sites shipped': 'situs produksi yang dibuat', 'dev roles, freelance': 'peran dev, freelance', 'ready to work': 'siap bekerja',
  Currently: 'Saat ini', Previously: 'Sebelumnya', 'Work history': 'Riwayat kerja', 'Full-stack + IT support.': 'Full-stack + dukungan IT.',
  'Tools I actually use': 'Tools yang saya gunakan', 'The stack follows the work': 'Stack mengikuti kebutuhan proyek',
  'I pick the tool for the job. The projects below show where Laravel, WordPress, React, and Node.js fit.': 'Saya memilih tools sesuai kebutuhan. Proyek di bawah menunjukkan penggunaan Laravel, WordPress, React, dan Node.js.',
  'Selected Works': 'Karya Pilihan', 'Live sites embedded below. Browse each site': 'Situs live ada di bawah. Jelajahi setiap situs', inside: 'di dalam', 'Open live': 'Buka situs',
  'Off-screen Work': 'Kerja di balik layar', 'This project runs headless. The useful part is the pipeline: where leads enter, how they are filtered, and when the bot sends them to WhatsApp.': 'Proyek ini berjalan secara headless. Bagian pentingnya adalah pipeline: dari mana lead masuk, bagaimana filternya, dan kapan bot mengirimnya ke WhatsApp.',
  'Profile': 'Profil', Bio: 'Bio', Education: 'Pendidikan', Certs: 'Sertifikat', Skills: 'Keahlian', Code: 'Kode', Tools: 'Tools',
  'Wanna tell me something?': 'Mau bilang sesuatu?',
  'Open for full-time, freelance, and project work. Fastest reply: email or WhatsApp. Based in Bekasi Utara.': 'Terbuka untuk kerja full-time, freelance, dan proyek. Balasan tercepat melalui email atau WhatsApp. Berbasis di Bekasi Utara.',
  'Leave a trace. No account needed.': 'Tinggalkan jejak. Tidak perlu akun.', 'Leave a trace': 'Tinggalkan jejak', 'Name': 'Nama', Message: 'Pesan',
  'Loading traces...': 'Memuat jejak...', 'No traces yet. Be the first.': 'Belum ada jejak. Jadilah yang pertama.', 'Back to top': 'Kembali ke atas',
  'Front-end demo for a second-hand marketplace. Product listings, categories, detail views - static build deployed on GitHub Pages.': 'Demo front-end untuk marketplace barang bekas. Ada daftar produk, kategori, dan halaman detail. Dibuat sebagai static build di GitHub Pages.',
  'Company platform I worked on as a web developer, combining PHP, JavaScript, Google Apps Script, and Supabase-backed workflows for promo codes and wallet withdrawals.': 'Platform perusahaan yang saya kerjakan sebagai web developer, menggunakan PHP, JavaScript, Google Apps Script, dan Supabase untuk sistem voucher serta penarikan saldo.',
  'Live catalog and custom-order site for the Kaos Dilio apparel brand, built with React, Vite, Tailwind, Supabase, and Vercel.': 'Situs katalog dan custom order untuk brand pakaian Kaos Dilio, dibuat dengan React, Vite, Tailwind, Supabase, dan Vercel.',
  'Company profile and research publication site for Indonesia Research Institute Japan. Built and customized in WordPress with custom PHP, HTML, CSS, and JavaScript.': 'Situs profil perusahaan dan publikasi riset untuk Indonesia Research Institute Japan. Dibuat dan dikustomisasi dengan WordPress, PHP, HTML, CSS, dan JavaScript.',
};

const originals = new WeakMap<Text, string>();

function syncLanguage(lang: 'en' | 'id') {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);

  for (const text of nodes) {
    if (!originals.has(text)) originals.set(text, text.data);
    const original = originals.get(text)!;
    const trimmed = original.trim();
    if (!trimmed) continue;
    const translated = translations[trimmed];
    const value = lang === 'id' && translated ? translated : trimmed;
    text.data = original.replace(trimmed, value);
  }
}

export default function LanguageSync() {
  const { lang } = useI18n();
  useEffect(() => syncLanguage(lang), [lang]);
  return null;
}
