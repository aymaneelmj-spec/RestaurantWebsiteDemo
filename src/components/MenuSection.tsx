import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { menuData } from '../data';
import { cn } from '../lib/utils';
import { ChefHat, Coffee, HandPlatter, IceCream, Wheat, GlassWater } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <HandPlatter className="w-4 h-4" />,
  breakfast: <Coffee className="w-4 h-4" />,
  appetizers: <Wheat className="w-4 h-4" />,
  main: <ChefHat className="w-4 h-4" />,
  desserts: <IceCream className="w-4 h-4" />,
  drinks: <GlassWater className="w-4 h-4" />,
};

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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-md">
            {t.menu.title}
          </h2>
          <div className="w-12 h-1 bg-brand-500 mx-auto"></div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border touch-manipulation',
                activeCategory === cat
                  ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-brand-500/50 hover:text-white active:border-brand-500/50 active:text-white'
              )}
            >
              {CATEGORY_ICONS[cat]}
              {t.menu.categories[cat as keyof typeof t.menu.categories]}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

/* ─── Separate card component so it can hold its own touch state ─── */
type MenuItem = (typeof menuData)[number];

function MenuCard({ item }: { item: MenuItem }) {
  // Track whether the card is "active" (tapped on mobile / hovered on desktop)
  const [active, setActive] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4 }}
      // Touch events for mobile
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 300)}
      // Mouse events for desktop
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        'group relative glass-panel rounded-2xl transition-colors duration-300 overflow-hidden flex flex-col touch-manipulation cursor-pointer',
        active ? 'border-brand-500/50' : 'border-white/10'
      )}
    >
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
        {/* Dark overlay — fades out when active */}
        <div
          className={cn(
            'absolute inset-0 z-10 transition-colors duration-500',
            active ? 'bg-transparent' : 'bg-dark-600/20'
          )}
        />
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={cn(
            'w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform',
            active ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
          )}
        />
        {item.featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="text-[10px] uppercase tracking-widest bg-dark-600/80 backdrop-blur-md border border-brand-500/50 text-brand-400 px-3 py-1.5 rounded-full shadow-lg">
              Chef's Rec
            </span>
          </div>
        )}
      </div>

      {/* Hover glow */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-brand-500/20 to-transparent pointer-events-none z-10 transition-opacity duration-500',
          active ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Card Body */}
      <div className="relative z-20 flex flex-col flex-grow p-5 md:p-6 bg-dark-600/80 border-t border-white/5">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3
            className={cn(
              'font-serif text-xl text-white font-medium leading-snug transition-colors duration-300',
              active ? 'text-brand-400' : 'text-white'
            )}
          >
            {item.name}
          </h3>
          <span className="text-brand-400 font-mono font-medium whitespace-nowrap bg-brand-500/10 px-2 py-1 rounded text-sm flex-shrink-0">
            QAR {item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed flex-grow">{item.desc}</p>
      </div>
    </motion.div>
  );
}