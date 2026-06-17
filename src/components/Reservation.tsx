import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { Calendar, Users, Clock, ArrowRight, User, Phone } from 'lucide-react';

export const Reservation = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const WHATSAPP_NUMBER = '97400000000'; // 🔁 Replace with your actual WhatsApp number (no + or spaces)

    const message =
      `🍽️ *New Reservation at Basta*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `🕐 *Time:* ${formData.time}\n` +
      `👥 *Guests:* ${formData.guests}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setTimeout(() => {
      setFormState('success');
      window.open(whatsappURL, '_blank');
    }, 800);
  };

  return (
    <section id="reserve" className="py-24 relative overflow-hidden bg-dark-600">
      {/* Background overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-md">
            {t.reservation.title}
          </h2>
          <div className="w-12 h-1 bg-brand-500 mx-auto mb-12"></div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-2xl"
        >
          {formState === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center text-brand-400 mb-6 border border-brand-500/50">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Reservation Confirmed</h3>
              <p className="text-gray-400">We look forward to hosting you at Basta.</p>
              <p className="text-gray-500 text-sm mt-2">Your details were sent to us via WhatsApp.</p>
              <button
                type="button"
                onClick={() => {
                  setFormState('idle');
                  setFormData({ name: '', phone: '', date: '', time: '', guests: '' });
                }}
                className="mt-6 text-brand-400 text-sm underline hover:text-brand-300 transition-colors"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              {/* Date */}
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Time */}
              <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500/50 transition-colors appearance-none"
                >
                  <option value="" disabled>Select Time</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                </select>
              </div>

              {/* Guests */}
              <div className="relative group md:col-span-2">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  placeholder="Number of Guests"
                  required
                  className="w-full bg-dark-500/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="md:col-span-2 py-4 bg-brand-500 text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-400 transition-colors rounded-lg flex justify-center items-center gap-2 group disabled:opacity-70"
              >
                {formState === 'loading' ? 'Processing...' : t.reservation.submit}
                {formState !== 'loading' && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};