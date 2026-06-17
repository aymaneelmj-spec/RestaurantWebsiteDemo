import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { useDemo } from '../lib/DemoContext';

// Curated hero headlines — random pick each load so it feels alive
const HEADLINES = [
  { title: 'Where Every Bite\nTells a Story', subtitle: 'Crafted with Passion · Served with Pride' },
  { title: 'A Table Awaits\nYou Tonight', subtitle: 'The Finest Flavors Under One Roof' },
  { title: 'Taste the Soul\nof the City', subtitle: 'Authentic · Elevated · Unforgettable' },
  { title: 'Moments Made\naround the Table', subtitle: 'Food That Brings People Together' },
  { title: 'From Our Kitchen\nto Your Heart', subtitle: 'Freshness · Tradition · Excellence' },
];

export const Hero = () => {
  const { t } = useLanguage();
  const { heroImage, images, businessName, cuisine } = useDemo();
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 1000], [0, 380]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Random headline per session
  const [headline] = useState(
    () => HEADLINES[Math.floor(Math.random() * HEADLINES.length)]
  );

  // If multiple images provided, cycle them as background slides
  const bgImages = images.length >= 1 ? images.slice(0, 4) : [heroImage];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (bgImages.length <= 1) return;
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [bgImages.length]);

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark-600"
    >
      {/* Background slideshow */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-600/70 via-dark-600/30 to-dark-600 z-10" />
        <AnimatePresence mode="sync">
          <motion.img
            key={bgImages[bgIndex]}
            src={bgImages[bgIndex]}
            alt={businessName}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 0 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop';
            }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Ambient orb */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-16"
      >
        {/* Cuisine tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <span className="inline-block text-brand-400 text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-7 drop-shadow-md border border-brand-500/30 px-5 py-2 rounded-full bg-brand-500/10 backdrop-blur-sm">
            {cuisine !== 'Authentic Cuisine' ? cuisine : t.hero.subtitle}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-5 leading-[1.1] drop-shadow-2xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline.title}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gray-300/80 text-sm md:text-base tracking-widest uppercase mb-10 font-light"
        >
          {headline.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="inline-flex items-center justify-center px-9 py-4 bg-brand-500 text-white font-bold tracking-widest uppercase text-xs hover:bg-brand-400 active:bg-brand-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/30 touch-manipulation"
          >
            {t.hero.cta}
          </a>
          <a
            href="#reserve"
            className="inline-flex items-center justify-center px-9 py-4 border border-white/30 text-white font-semibold tracking-widest uppercase text-xs hover:border-brand-400 hover:text-brand-400 active:border-brand-400 active:text-brand-400 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm touch-manipulation"
          >
            Reserve a Table
          </a>
        </motion.div>
      </motion.div>

      {/* Slide dots */}
      {bgImages.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setBgIndex(i)}
              className={`transition-all duration-500 rounded-full touch-manipulation ${
                i === bgIndex
                  ? 'w-8 h-1.5 bg-brand-400'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div
            animate={{ top: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute top-0 w-full h-1/2 bg-brand-400"
          />
        </div>
      </motion.div>
    </section>
  );
};
