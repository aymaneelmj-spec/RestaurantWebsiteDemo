import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu as MenuIcon, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useDemo } from '../lib/DemoContext';
import { cn } from '../lib/utils';
import { Language } from '../data';

export const Navbar = () => {
  const { lang, setLang, t, dir } = useLanguage();
  const { businessName, cuisine, isDemo } = useDemo();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileMenu,   setMobileMenu]   = useState(false);
  const [langSelector, setLangSelector] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close lang selector when clicking outside
  useEffect(() => {
    if (!langSelector) return;
    const close = () => setLangSelector(false);
    window.addEventListener('click', close, { capture: true, once: true });
  }, [langSelector]);

  const changeLang = (l: Language) => { setLang(l); setLangSelector(false); };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed w-full z-50 transition-all duration-300 ease-in-out border-b border-transparent',
        isDemo ? 'top-[36px]' : 'top-0',
        scrolled
          ? 'bg-dark-600/92 backdrop-blur-xl border-white/5 py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl md:text-3xl tracking-widest text-brand-500 font-bold drop-shadow-sm leading-none">
            {businessName}
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-gray-400 hidden sm:block border-l border-white/15 pl-3 ml-1 leading-snug">
            {cuisine !== 'Authentic Cuisine' ? cuisine : 'Authentic\nCuisine'}
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {(['home', 'menu', 'story'] as const).map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-brand-400 active:text-brand-400 transition-colors touch-manipulation"
            >
              {t.nav[item]}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Reserve CTA */}
          <a
            href="#reserve"
            className="hidden md:flex items-center relative group px-5 py-2 overflow-hidden border border-brand-500/50 rounded-full touch-manipulation"
          >
            <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-brand-500/25 transition-colors duration-300" />
            <span className="relative text-[11px] uppercase tracking-widest text-brand-400 font-bold">
              {t.nav.reserve}
            </span>
          </a>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangSelector(!langSelector); }}
              className="p-2 rounded-full hover:bg-white/8 active:bg-white/8 transition-colors text-gray-300 hover:text-brand-400 touch-manipulation"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {langSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    'absolute top-full mt-2 w-28 p-2 glass-panel rounded-xl flex flex-col gap-1 shadow-2xl shadow-black',
                    dir === 'rtl' ? 'left-0' : 'right-0',
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={cn(
                        'text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors uppercase tracking-widest touch-manipulation',
                        lang === l
                          ? 'bg-brand-500/20 text-brand-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 active:text-white',
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-2 hover:text-brand-400 active:text-brand-400 transition-colors touch-manipulation"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-dark-600/97 backdrop-blur-2xl z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-2 text-white hover:text-brand-400 active:text-brand-400 transition-colors touch-manipulation"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Business name in mobile menu */}
            <p className="font-serif text-brand-500/60 text-sm tracking-widest uppercase mb-10">
              {businessName}
            </p>

            <div className="flex flex-col gap-7 text-center">
              {(['home', 'menu', 'story', 'reserve'] as const).map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMobileMenu(false)}
                  className="text-3xl font-serif text-white hover:text-brand-400 active:text-brand-400 transition-colors touch-manipulation"
                >
                  {t.nav[item]}
                </a>
              ))}
            </div>

            {/* Lang switcher in mobile menu */}
            <div className="flex gap-4 mt-12">
              {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { changeLang(l); setMobileMenu(false); }}
                  className={cn(
                    'text-sm font-semibold uppercase tracking-widest px-4 py-2 rounded-full border transition-all touch-manipulation',
                    lang === l
                      ? 'border-brand-500 text-brand-400 bg-brand-500/10'
                      : 'border-white/10 text-gray-400 hover:text-white',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
