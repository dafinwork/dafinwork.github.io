'use client';

import { useEffect } from 'react';
import { useI18n } from '../lib/i18n';

const translations: Record<string, string> = {
  'Skip to works': 'Lewati ke karya', Works: 'Karya', Systems: 'Sistem', Experience: 'Pengalaman', About: 'Tentang', Contact: 'Kontak', Jejak: 'Jejak',
  'Hi': 'Halo', there: 'semua', 'See works': 'Lihat karya', 'Email me': 'Email saya',
  "I'm Muhamad Dafin Al Dzaky, a full-stack developer using Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, and Node.js. I also provide IT support for PC and laptop setup, troubleshooting, and maintenance.": 'Saya Muhamad Dafin Al Dzaky, developer full-stack yang menggunakan Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, dan Node.js. Saya juga menyediakan IT support untuk setup PC dan laptop, troubleshooting, serta perawatan.',
  'production sites shipped': 'situs produksi yang dibuat', 'dev roles, freelance': 'peran dev, freelance', 'ready to work': 'siap bekerja',
  Currently: 'Saat ini', Previously: 'Sebelumnya', 'Work history': 'Riwayat kerja', 'Full-stack + IT support.': 'Full-stack + IT support.',
  'LinkedIn lead-gen system (Google X-Ray), Gemini + Groq intent filter, Baileys WhatsApp dispatch bot with cron.': 'Sistem lead-gen LinkedIn (Google X-Ray), filter intent Gemini + Groq, bot dispatch WhatsApp Baileys dengan cron.',
  'Tools I actually use': 'Tools yang saya gunakan', 'The stack follows the work': 'Stack mengikuti kebutuhan proyek',
  'I pick the tool for the job. The projects below show where Laravel, WordPress, React, and Node.js fit.': 'Saya memilih tools sesuai kebutuhan. Proyek di bawah menunjukkan penggunaan Laravel, WordPress, React, dan Node.js.',
  'Selected Works': 'Karya Pilihan', 'Live sites embedded below. Browse each site': 'Situs live ada di bawah. Jelajahi setiap situs', inside: 'di dalam', 'Open live': 'Buka situs',
  'Off-screen Work': 'Kerja di balik layar', 'This project runs headless. The useful part is the pipeline: where leads enter, how they are filtered, and when the bot sends them to WhatsApp.': 'Proyek ini berjalan secara headless. Bagian pentingnya adalah pipeline: dari mana lead masuk, bagaimana filternya, dan kapan bot mengirimnya ke WhatsApp.',
  'Profile': 'Profil', Bio: 'Bio', Education: 'Pendidikan', Certs: 'Sertifikat', Skills: 'Keahlian', Code: 'Kode', Tools: 'Tools',
  'Wanna tell me something?': 'Mau bilang sesuatu?',
  'Open for full-time, freelance, and project work. Fastest reply: email or WhatsApp. Based in Bekasi Utara.': 'Terbuka untuk kerja full-time, freelance, dan proyek. Balasan tercepat melalui email atau WhatsApp. Berbasis di Bekasi Utara.',
  'Web': 'Web', Frontend: 'Frontend', CMS: 'CMS', Backend: 'Backend', Automation: 'Otomasi', APIs: 'API',
  Gallery: 'Galeri', 'Live sites': 'Situs live', LIVE: 'LIVE',
  'Secondhand Marketplace': 'Marketplace Barang Bekas', 'Klik Rekrut - Recruitment Platform': 'Klik Rekrut - Platform Rekrutmen', 'Kaos Dilio - Apparel Storefront': 'Kaos Dilio - Toko Apparel', 'IRIJ Jakarta - Research Institute': 'IRIJ Jakarta - Lembaga Riset',
  'If this frame shows blank, the site blocks embedding: click': 'Jika frame ini kosong, situs memblokir embed: klik', 'Preview image shown because the live site may block iframe embedding.': 'Gambar preview ditampilkan karena situs live mungkin memblokir iframe.',
  'LinkedIn Lead-Gen + WhatsApp Dispatch Bot': 'Bot Lead-Gen LinkedIn + Dispatch WhatsApp',
  'AI & Automation · KLIK Rekrut · Node.js': 'AI & Otomasi · KLIK Rekrut · Node.js',
  'Headless by design. 24/7 background worker. Architecture walkthrough and source code available on request.': 'Dirancang headless. Worker berjalan 24/7. Penjelasan arsitektur dan source code tersedia jika diminta.',
  'Work log': 'Riwayat kerja', 'AI & Automation Developer': 'Developer AI & Otomasi', 'Web Developer': 'Web Developer', 'WordPress Developer': 'Developer WordPress', 'Web Developer - Internship & Freelance': 'Web Developer - Magang & Freelance', Barista: 'Barista', Now: 'Sekarang', remote: 'remote',
  'Let’s work together': 'Mari bekerja sama', 'S1 Informatics graduate with an RPL background. I build full-stack web apps with Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, Node.js, and WordPress. I also handle IT support: PC assembly, OS installs, drivers, troubleshooting, and basic maintenance.': 'Lulusan S1 Informatika dengan latar RPL. Saya membuat aplikasi web full-stack dengan Next.js, React, Supabase, Go, Docker, Laravel, PHP, JavaScript, Node.js, dan WordPress. Saya juga menangani dukungan IT: rakit PC, instalasi OS, driver, troubleshooting, dan perawatan dasar.',
  'Hardware & support': 'Hardware & dukungan', 'PC assembly & component installs': 'Rakit PC & instalasi komponen', 'Windows fresh install, drivers, apps': 'Instalasi baru Windows, driver, dan aplikasi', 'PC / laptop fault diagnosis': 'Diagnosis masalah PC / laptop', 'Technical & user support': 'Dukungan teknis dan pengguna',
  'Python for Data Science - IBM (Nov 2024)': 'Python untuk Data Science - IBM (Nov 2024)', 'Intro to Cybersecurity - Cisco (Nov 2024)': 'Pengantar Keamanan Siber - Cisco (Nov 2024)', 'Junior Cybersecurity Analyst - Cisco': 'Junior Cybersecurity Analyst - Cisco',
  'Email': 'Email', WhatsApp: 'WhatsApp', LinkedIn: 'LinkedIn', 'Back to top': 'Kembali ke atas',
  '1 · Hybrid Ingestion': '1 · Ingestion Hybrid', '2 · Snowflake & Pre-Filter': '2 · Snowflake & Pre-Filter', '3 · Dual-LLM Intent Filter': '3 · Filter Intent Dual-LLM', '4 · WhatsApp Dispatch': '4 · Dispatch WhatsApp',
  'Dual-engine scraping using persistent Playwright Chromium for real-time past-24h feeds and Google X-Ray for unauthenticated deep search.': 'Scraping dual-engine memakai Playwright Chromium persisten untuk feed 24 jam terakhir dan Google X-Ray untuk deep search tanpa login.',
  'Decodes LinkedIn Snowflake activity IDs for millisecond-precision age filtering, SQLite deduplication, and eliminates non-personal/foreign posts.': 'Mendecode activity ID Snowflake LinkedIn untuk filter usia dengan presisi milidetik, deduplikasi SQLite, serta menghapus postingan non-personal atau asing.',
  'Gemini & Groq semantic analysis with automated key pooling to detect genuine B2B buyer intent.': 'Analisis semantik Gemini dan Groq dengan key pooling otomatis untuk mendeteksi intent pembeli B2B.',
  'Built on Baileys socket. Dispatches consolidated leads via a staggered 2-hour queue and handles real-time interactive query commands in sales groups.': 'Dibangun dengan socket Baileys. Mengirim lead gabungan melalui antrean bertahap 2 jam dan menangani perintah query interaktif di grup sales.',
  'Prepared and served coffee and beverage orders in a fast-paced café; maintained service standards.': 'Menyiapkan dan menyajikan pesanan kopi serta minuman di kafe yang sibuk, sekaligus menjaga standar pelayanan.' ,
  'Leave a trace. No account needed.': 'Tinggalkan jejak. Tidak perlu akun.', 'Leave a trace': 'Tinggalkan jejak', 'Name': 'Nama', Message: 'Pesan',
  'Loading traces...': 'Memuat jejak...', 'No traces yet. Be the first.': 'Belum ada jejak. Jadilah yang pertama.',
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
