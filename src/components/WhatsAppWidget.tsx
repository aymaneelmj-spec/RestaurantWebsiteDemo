import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Check, Calendar, Clock, Users, ArrowLeft } from 'lucide-react';
import { menuData } from '../data';
import { cn } from '../lib/utils';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'order' | 'book'>('initial');
  
  // Book State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  
  // Order State
  const [selectedItems, setSelectedItems] = useState<{id: number, qty: number}[]>([]);
  
  // Quick popular items
  const popularItems = menuData.filter(m => m.featured || [1, 7].includes(m.id)).slice(0, 4);

  const toggleItem = (id: number) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.filter(item => item.id !== id);
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    const text = `Hello BASTA! 👋\n\nI would like to request a table reservation:\n📅 *Date:* ${date}\n⏰ *Time:* ${time}\n👥 *Guests:* ${guests} people\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/97450001866?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  const handleOrderSubmit = () => {
    if (selectedItems.length === 0) return;
    
    let total = 0;
    const orderDetails = selectedItems.map(item => {
      const food = menuData.find(m => m.id === item.id);
      if (!food) return '';
      total += food.price * item.qty;
      return `• 1x *${food.name}* (QAR ${food.price.toFixed(2)})`;
    }).join('\n');

    const text = `Hello BASTA! 👋\n\nI would like to place an order:\n\n*My Order:*\n${orderDetails}\n\n*Total:* QAR ${total.toFixed(2)}\n\nPlease let me know the next steps. Thank you!`;
    window.open(`https://wa.me/97450001866?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  // Chat message bubbles
  const Message = ({ children, isBot = true }: { children: React.ReactNode, isBot?: boolean }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed mb-3",
        isBot 
          ? "bg-dark-500 text-gray-200 self-start border border-white/5 rounded-tl-sm ml-2" 
          : "bg-brand-500 text-white self-end rounded-tr-sm mr-2"
      )}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-dark-600 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden w-80 max-w-[calc(100vw-32px)] flex flex-col mb-4 origin-bottom-right rounded-t-2xl rounded-bl-2xl rounded-br-[4px]"
          >
            {/* Header */}
            <div className="bg-brand-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold tracking-wider shadow-inner">
                  B
                </div>
                <div>
                  <h3 className="font-medium text-sm">Basta Assistant</h3>
                  <p className="text-xs text-brand-100 opacity-90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[400px] flex flex-col minimal-scrollbar bg-[#1c1c1f] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
              
              {/* Initial Step */}
              {step === 'initial' && (
                <>
                  <Message>Hello! Welcome to BASTA 🌴</Message>
                  <Message>Are you looking to book a table or order food?</Message>
                  
                  <div className="flex flex-col gap-2 mt-2 px-2">
                    <button 
                      onClick={() => setStep('book')}
                      className="bg-dark-400 hover:bg-brand-500/20 hover:text-brand-400 hover:border-brand-500/50 transition-all border border-white/10 text-white rounded-xl py-3 px-4 text-sm font-medium text-left flex justify-between items-center"
                    >
                      📅 Book a Table
                    </button>
                    <button 
                      onClick={() => setStep('order')}
                      className="bg-dark-400 hover:bg-brand-500/20 hover:text-brand-400 hover:border-brand-500/50 transition-all border border-white/10 text-white rounded-xl py-3 px-4 text-sm font-medium text-left flex justify-between items-center"
                    >
                      🍽️ Order Food
                    </button>
                  </div>
                </>
              )}

              {/* Book a Table Step */}
              {step === 'book' && (
                <>
                  <div className="flex justify-between items-center w-full mb-4 px-2">
                    <button onClick={() => setStep('initial')} className="text-gray-400 hover:text-white flex items-center text-xs gap-1">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>
                  <Message isBot={false}>I want to book a table.</Message>
                  <Message>Excellent! When would you like to visit us?</Message>
                  
                  <form onSubmit={handleBookSubmit} className="flex flex-col gap-3 mt-2 px-2">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="date" 
                        required 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-dark-500 border border-white/10 text-sm rounded-lg py-2 pl-10 pr-3 text-white focus:border-brand-500 outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="time" 
                        required 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-dark-500 border border-white/10 text-sm rounded-lg py-2 pl-10 pr-3 text-white focus:border-brand-500 outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="number" 
                        min="1"
                        required 
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="Guests"
                        className="w-full bg-dark-500 border border-white/10 text-sm rounded-lg py-2 pl-10 pr-3 text-white focus:border-brand-500 outline-none"
                      />
                    </div>
                    <button type="submit" className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-2 transition-colors">
                      <MessageCircle className="w-4 h-4" /> Send Request
                    </button>
                  </form>
                </>
              )}

              {/* Order Food Step */}
              {step === 'order' && (
                <>
                  <div className="flex justify-between items-center w-full mb-4 px-2">
                    <button onClick={() => setStep('initial')} className="text-gray-400 hover:text-white flex items-center text-xs gap-1">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                  </div>
                  <Message isBot={false}>I want to order food.</Message>
                  <Message>Great choice! Select items below to build your order ticket, then send it directly to our WhatsApp.</Message>
                  
                  <div className="flex flex-col gap-2 px-2 mt-2">
                    {popularItems.map((item) => {
                      const isSelected = selectedItems.some(i => i.id === item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                            isSelected ? "bg-brand-500/10 border-brand-500" : "bg-dark-500 border-white/10 hover:border-white/30"
                          )}
                        >
                          <div>
                            <p className="text-sm font-medium text-white">{item.name}</p>
                            <p className="text-xs text-brand-400">QAR {item.price.toFixed(2)}</p>
                          </div>
                          <div className={cn("w-5 h-5 rounded-md flex items-center justify-center border", isSelected ? "bg-brand-500 border-brand-500 text-white" : "border-white/20")}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedItems.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-2 mt-4">
                      <button onClick={handleOrderSubmit} className="w-full bg-[#25D366] hover:bg-[#20BE5C] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg">
                        <MessageCircle className="w-4 h-4" /> Send Order via WhatsApp
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all z-50",
          isOpen ? "bg-dark-400 rotate-90" : "bg-[#25D366] hover:bg-[#20BE5C]"
        )}
        aria-label="WhatsApp Chat"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>
    </div>
  );
};
