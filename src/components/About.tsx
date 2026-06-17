import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { useDemo } from '../lib/DemoContext';

export const About = () => {
  const { t } = useLanguage();
  const { images } = useDemo();

  return (
    <section id="story" className="py-32 bg-dark-600 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Images Parallax-style Grid */}
        <div className="grid grid-cols-2 gap-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="col-span-1 pt-12"
          >
            <img
              src={images.about1}
              alt="Restaurant detail"
              className="w-full h-80 object-cover rounded-xl filter hover:brightness-110 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1"
          >
            <img
              src={images.about2}
              alt="Culinary prep"
              className="w-full h-96 object-cover rounded-xl filter hover:brightness-110 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-600/80 backdrop-blur-md p-6 rounded-full border border-brand-500/20 shadow-2xl">
            <span className="font-serif text-3xl text-brand-400 font-bold">Est.</span>
          </div>
        </div>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:pl-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight drop-shadow-md">
            {t.about.title}
          </h2>
          <div className="w-16 h-px bg-brand-500 mb-8"></div>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {t.about.desc}
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-8">
            <div>
              <h4 className="text-brand-400 font-serif text-2xl mb-2">Artisan</h4>
              <p className="text-gray-500 text-sm">Handcrafted menus reflecting local heritage.</p>
            </div>
            <div>
              <h4 className="text-brand-400 font-serif text-2xl mb-2">Ambiance</h4>
              <p className="text-gray-500 text-sm">A setting designed for true luxury and comfort.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};