import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { menuData } from '../data';
import { cn } from '../lib/utils';
import { ChefHat, Coffee, HandPlatter, IceCream, Wheat, GlassWater } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all:        <HandPlatter className="w-4 h-4" />,
  breakfast:  <Coffee className="w-4 h-4" />,
  appetizers: <Wheat className="w-4 h-4" />,
  main:       <ChefHat className="w-4 h-4" />,
  desserts:   <IceCream className="w-4 h-4" />,
  drinks:     <GlassWater className="w-4 h-4" />,
};

// ─── Individual card — owns its own hover/touch state ────────────────────────
type MenuItem = (typeof menuData)[number];

function MenuCard({ item }: { item: MenuItem }) {
  const [pressed, setPressed] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      // ── Desktop hover
      onMouseEnter={() => setPressed(true)}
      onMouseLeave={() => setPressed(false)}
      // ── Mobile touch — brief active state for feedback
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setTimeout(() => setPressed(false), 400)}
      onTouchCancel={() => setPressed(false)}
      className={cn(
        'relative glass-panel rounded-2xl overflow-hidden flex flex-col transition-all duration-300 touch-manipulation cursor-pointer',
        pressed ? 'border-brand-500/60 shadow-[0_0_30px_rgba(255,70,0,0.15)]' : 'border-white/8 shadow-none',
      )}
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
        {/* Dim overlay */}
        <div
          className="absolute inset-0 z-10 transition-all duration-500"
          style={{ background: pressed ? 'transparent' : 'rgba(28,28,31,0.2)' }}
        />
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: pressed ? 'scale(1.08) rotate(0.5deg)' : 'scale(1) rotate(0deg)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] uppercase tracking-widest bg-dark-600/80 backdrop-blur-md border border-brand-500/50 text-brand-400 px-3 py-1.5 rounded-full shadow-lg">
              Chef's Pick
            </span>
          </div>
        )}
      </div>

      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(255,70,0,0.18), transparent)',
          opacity: pressed ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-grow p-5 md:p-6 bg-dark-600/85 border-t border-white/5">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3
            className="font-serif text-[1.1rem] md:text-xl font-medium leading-snug transition-colors duration-300"
            style={{ color: pressed ? 'var(--color-brand-400, #FF6633)' : 'white' }}
          >
            {item.name}
          </h3>
          <span className="text-brand-400 font-mono text-sm font-semibold whitespace-nowrap bg-brand-500/10 px-2 py-1 rounded flex-shrink-0">
            QAR {item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export const MenuSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = Object.keys(t.menu.categories);
  const filteredData =
    activeCategory === 'all'
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-dark-600 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-md">
            {t.menu.title}
          </h2>
          <div className="w-12 h-1 bg-brand-500 mx-auto" />
        </div>

        {/* Category filters — horizontally scrollable on mobile */}
        <div className="flex gap-2 mb-14 overflow-x-auto pb-2 justify-start md:justify-center minimal-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border touch-manipulation select-none',
                activeCategory === cat
                  ? 'bg-brand-500/15 border-brand-500 text-brand-400 shadow-[0_0_16px_rgba(255,70,0,0.2)]'
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-brand-500/40 hover:text-white active:border-brand-500/40 active:text-white',
              )}
            >
              {CATEGORY_ICONS[cat]}
              {t.menu.categories[cat as keyof typeof t.menu.categories]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
