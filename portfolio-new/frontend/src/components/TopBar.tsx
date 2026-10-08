'use client';
import { useEffect, useState } from 'react';
import { useI18n } from '../lib/i18n';

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const { setLang: changeLang, t } = useI18n();
  const [lang, setLang] = useState<'en' | 'id'>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('dafin-lang') as 'en' | 'id') || 'en';
  });

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('dafin-lang', lang);
  }, [lang]);

  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav id="primary-nav" aria-label="Primary">
          <a href="#works" onClick={() => setOpen(false)}>{t('nav.works')}</a>
          <a href="#systems" onClick={() => setOpen(false)}>{t('nav.systems')}</a>
          <a href="#experience" onClick={() => setOpen(false)}>{t('nav.experience')}</a>
          <a href="#about" onClick={() => setOpen(false)}>{t('nav.about')}</a>
          <a href="#contact" onClick={() => setOpen(false)}>{t('nav.contact')}</a>
          <a href="#guestbook" onClick={() => setOpen(false)}>{t('nav.guestbook')}</a>
        </nav>
        <div className="topbar-actions">
          <div className="lang" role="group" aria-label="Language / Bahasa">
            <button
              type="button"
              data-lang="en"
              className={lang === 'en' ? 'on' : ''}
              aria-pressed={lang === 'en'}
              onClick={() => { setLang('en'); changeLang('en'); }}
            >EN</button>
            <button
              type="button"
              data-lang="id"
              className={lang === 'id' ? 'on' : ''}
              aria-pressed={lang === 'id'}
              onClick={() => { setLang('id'); changeLang('id'); }}
            >ID</button>
          </div>
          <a className="btn btn-gold btn-sm" href="mailto:muhamaddafinaldzaky@gmail.com">
            {t('nav.cta')} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
