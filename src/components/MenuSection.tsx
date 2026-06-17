import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { menuData } from '../data';
import { cn } from '../lib/utils';
import { ChefHat, Coffee, HandPlatter, IceCream, Wheat, UtilityPole } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: <HandPlatter className="w-4 h-4" />,
  breakfast: <Coffee className="w-4 h-4" />,
  appetizers: <Wheat className="w-4 h-4" />,
  main: <ChefHat className="w-4 h-4" />,
  desserts: <IceCream className="w-4 h-4" />,
  drinks: <UtilityPole className="w-4 h-4" /> 
};

export const MenuSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = Object.keys(t.menu.categories);
  
  const filteredData = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-dark-600 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-md">{t.menu.title}</h2>
          <div className="w-12 h-1 bg-brand-500 mx-auto"></div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 flex border",
                activeCategory === cat 
                  ? "bg-brand-500/10 border-brand-500 text-brand-400" 
                  : "bg-transparent border-white/10 text-gray-400 hover:border-brand-500/50 hover:text-white"
              )}
            >
              {t.menu.categories[cat as keyof typeof t.menu.categories]}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                className="group relative glass-panel rounded-2xl hover:border-brand-500/50 transition-colors duration-500 overflow-hidden flex flex-col"
              >
                {/* 3D Image Container */}
                <div className="relative w-full h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-dark-600/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                  />
                  {item.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="text-[10px] uppercase tracking-widest bg-dark-600/80 backdrop-blur-md border border-brand-500/50 text-brand-400 px-3 py-1.5 rounded-full shadow-lg">
                        Chef's Rec
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtle hover glow inside */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                
                <div className="relative z-20 flex flex-col flex-grow p-6 bg-dark-600/80 border-t border-white/5">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="font-serif text-xl text-white font-medium leading-snug group-hover:text-brand-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-brand-400 font-mono font-medium whitespace-nowrap bg-brand-500/10 px-2 py-1 rounded">
                      QAR {item.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
