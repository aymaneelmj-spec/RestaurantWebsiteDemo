import React from 'react';
import { LanguageProvider } from './lib/LanguageContext';
import { DemoProvider, useDemo } from './lib/DemoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';

function DemoBanner() {
  const { isDemo, businessName } = useDemo();
  if (!isDemo) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: '#ca8a04', color: '#1c1917',
      textAlign: 'center', padding: '7px 16px',
      fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
    }}>
      🔒 DEMO PREVIEW — {businessName} — This site is not live yet. Contact us to get it.
    </div>
  );
}

function MainApp() {
  const { isDemo } = useDemo();
  return (
    <div
      className="min-h-screen relative selection:bg-brand-500/30 selection:text-brand-400 font-sans font-light bg-dark-600"
      style={isDemo ? { paddingTop: '34px' } : {}}
    >
      <DemoBanner />
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
    <DemoProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </DemoProvider>
  );
}
