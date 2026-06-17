/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';

function MainApp() {
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen relative selection:bg-brand-500/30 selection:text-brand-400 font-sans font-light bg-dark-600">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Reservation />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

