import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { useDemo, FALLBACK_IMAGE } from '../lib/DemoContext';

/**
 * Picks the best Google Maps photo size token based on the viewport.
 * Google photo URLs accept &w= and &h= parameters.
 * We inject the right size so mobile gets a smaller, faster image.
 */
function resizeGooglePhoto(url: string): string {
  try {
    // Detect rough viewport category
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Google Maps photo URLs look like:
    //   https://lh3.googleusercontent.com/p/AF1Qip...=w1920-h1080
    // OR they may not have size tokens at all.
    // We strip existing size tokens and inject optimal ones.
    const w = vw <= 480  ? 800
            : vw <= 1024 ? 1400
            :              1920;
    const h = vh <= 700  ? 900
            : vh <= 1080 ? 1200
            :              1080;

    // Replace existing =w...-h... or =s... token
    if (url.includes('googleusercontent.com') || url.includes('googleapis.com')) {
      // Remove any trailing size token  (=w..., =s..., =h...)
      const base = url.replace(/=[whs]\d+(-[whs]\d+)*$/, '');
      return `${base}=w${w}-h${h}`;
    }

    // For Unsplash or other CDNs that support ?w= / &w=
    if (url.includes('unsplash.com')) {
      const u = new URL(url);
      u.searchParams.set('w', String(w));
      u.searchParams.set('h', String(h));
      u.searchParams.set('fit', 'crop');
      u.searchParams.set('auto', 'format');
      u.searchParams.set('q', '80');
      return u.toString();
    }
  } catch {
    // Any parse error — return as-is
  }
  return url;
}

export const Hero = () => {
  const { t } = useLanguage();
  const { heroImage } = useDemo();
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500],  [1, 0]);

  // Determine the image source: URL param → fallback
  const rawSrc = heroImage ?? '/mainBackground.jpg';

  // For Google / known CDN images, inject optimal size
  const optimisedSrc = heroImage ? resizeGooglePhoto(heroImage) : rawSrc;

  const [src, setSrc] = useState(optimisedSrc);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark-600">

      {/* Background Image with parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-600/55 via-dark-600/35 to-dark-600 z-10" />
        <img
          key={src}
          src={src}
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover object-center scale-105"
          style={{ objectPosition: 'center 30%' }}
          onError={() => {
            // If optimised URL fails, try original; then fallback
            if (src !== rawSrc)        { setSrc(rawSrc); return; }
            if (src !== FALLBACK_IMAGE) { setSrc(FALLBACK_IMAGE); }
          }}
        />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

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
          />
        </div>
      </motion.div>
    </section>
  );
};
