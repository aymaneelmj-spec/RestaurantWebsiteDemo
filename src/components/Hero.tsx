import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark-600">
      
      {/* Background Image & Parallax Effect */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-600/60 via-dark-600/40 to-dark-600 z-10"></div>
        <img 
          src="/mainBackground.jpg" 
          alt="Basta Restaurant Atmosphere" 
          className="w-full h-full object-cover object-center scale-105"
          onError={(e) => {
            // Fallback luxury texture if image not uploaded yet
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop";
          }}
        />
      </motion.div>

      {/* Floating Ambient Light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-brand-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6 drop-shadow-md">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-8 leading-tight drop-shadow-xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.8 }}
        >
          <a 
            href="#menu" 
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white font-semibold tracking-widest uppercase text-sm rounded-none hover:bg-brand-400 transition-all duration-300 hover:scale-105"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ top: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-full h-1/2 bg-brand-400"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};
