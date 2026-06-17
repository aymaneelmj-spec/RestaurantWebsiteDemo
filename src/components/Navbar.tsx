import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu as MenuIcon, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { cn } from '../lib/utils';
import { Language } from '../data';

export const Navbar = () => {
  const { lang, setLang, t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [langSelector, setLangSelector] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    setLangSelector(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled ? "bg-dark-600/90 backdrop-blur-xl border-white/5 py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-3xl tracking-widest text-brand-500 font-bold drop-shadow-sm leading-none">BASTA</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1 hidden sm:block border-l border-white/20 pl-2 ml-2">Qatari <br/>Cuisine</span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'menu', 'story'].map((item) => (
            <a key={item} href={`#${item}`} className="text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-brand-400 transition-colors">
              {t.nav[item as keyof typeof t.nav]}
            </a>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          
          <a href="#reserve" className="hidden md:block relative group px-6 py-2 overflow-hidden border border-brand-500/50 rounded-full">
            <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors duration-300"></div>
            <span className="relative text-xs uppercase tracking-widest text-brand-400 font-bold">{t.nav.reserve}</span>
          </a>

          {/* LANGUAGE SYSTEM */}
          <div className="relative">
            <button 
              onClick={() => setLangSelector(!langSelector)}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-300 hover:text-brand-400"
            >
              <Globe className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {langSelector && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={cn(
                    "absolute top-full mt-2 w-32 p-2 glass-panel rounded-xl flex flex-col gap-1 shadow-2xl shadow-black",
                    dir === 'rtl' ? "left-0" : "right-0"
                  )}
                >
                  {(['en', 'ar', 'fr'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={cn(
                        "text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors uppercase tracking-widest",
                        lang === l ? "bg-brand-500/20 text-brand-400" : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="md:hidden text-white p-2 hover:text-brand-400 transition-colors" onClick={() => setMobileMenu(true)}>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-600/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center"
          >
            <button className="absolute top-6 right-6 p-2 text-white hover:text-brand-400 transition-colors" onClick={() => setMobileMenu(false)}><X className="w-8 h-8"/></button>
            <div className="flex flex-col gap-8 text-center">
               {['home', 'menu', 'story', 'reserve'].map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMobileMenu(false)} className="text-2xl font-serif text-white hover:text-brand-400 transition-colors">
                  {t.nav[item as keyof typeof t.nav]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
