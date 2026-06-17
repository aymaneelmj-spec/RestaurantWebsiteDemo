import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { useDemo } from '../lib/DemoContext';
import { MapPin, Phone, Instagram } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { businessName, city, phone } = useDemo();

  // Format phone for display: e.g. 97455001234 → +974 5500 1234
  const displayPhone = phone.startsWith('974')
    ? `+974 ${phone.slice(3, 7)} ${phone.slice(7)}`
    : `+${phone}`;

  return (
    <footer className="bg-[#121214] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-3xl tracking-widest text-brand-500 font-bold mb-4 drop-shadow-sm">
              {businessName}
            </span>
            <p className="text-gray-500 text-sm max-w-xs">
              Authentic Qatari cuisine served in a luxurious, modern atmosphere. Experience the true taste of tradition.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-400 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <h4 className="text-white font-serif text-xl mb-6">Contact</h4>
            <div className="flex items-center gap-3 text-gray-400 mb-4 hover:text-brand-400 transition-colors">
              <Phone className="w-4 h-4 text-brand-500" />
              <span>{displayPhone}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-400 hover:text-brand-400 transition-colors">
              <MapPin className="w-4 h-4 text-brand-500 mt-1" />
              <div className="max-w-[200px]">
                {city}, Qatar
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
            <h4 className="text-white font-serif text-xl mb-6">Opening Hours</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Mon - Sun</li>
              <li className="text-brand-400 font-medium">9:30 AM – 12:30 AM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} {businessName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
