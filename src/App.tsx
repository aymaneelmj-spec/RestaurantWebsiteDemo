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

// Height of the demo banner in px — keep in sync with the banner padding/font
const BANNER_H = 40;

function DemoBanner() {
  const { isDemo, businessName } = useDemo();
  if (!isDemo) return null;

  return (
    <div style={{
      position : 'fixed',
      top      : 0,
      left     : 0,
      right    : 0,
      zIndex   : 9999,
      height   : `${BANNER_H}px`,
      display  : 'flex',
      alignItems : 'center',
      justifyContent : 'center',
      gap      : '8px',
      background : '#854d0e',          // dark amber — readable, professional
      borderBottom : '1px solid #a16207',
      color    : '#fef9c3',
      fontSize : '11px',
      fontWeight : 600,
      letterSpacing : '0.08em',
      textTransform : 'uppercase',
      padding  : '0 16px',
      whiteSpace : 'nowrap',
      overflow : 'hidden',
    }}>
      <span style={{ opacity: 0.6 }}>🔒</span>
      <span>Demo preview</span>
      <span style={{ opacity: 0.4, margin: '0 4px' }}>—</span>
      <span style={{ color: '#fde68a', maxWidth: '55vw', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {businessName}
      </span>
      <span style={{ opacity: 0.4, margin: '0 4px' }}>—</span>
      <span style={{ opacity: 0.85 }}>Site not live yet · Contact us</span>
    </div>
  );
}

function MainApp() {
  const { isDemo } = useDemo();

  return (
    // When demo banner is shown, push ALL content down by banner height
    // so nothing is hidden underneath it
    <div
      className="min-h-screen relative selection:bg-brand-500/30 selection:text-brand-400 font-sans font-light bg-dark-600"
      style={isDemo ? { marginTop: `${BANNER_H}px` } : {}}
    >
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
        {/* Banner sits outside the pushed-down wrapper so it stays fixed at top */}
        <DemoBanner />
        <MainApp />
      </LanguageProvider>
    </DemoProvider>
  );
}
