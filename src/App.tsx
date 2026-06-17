import React, { useEffect, useRef, useState } from 'react';
import { LanguageProvider } from './lib/LanguageContext';
import { DemoProvider, useDemo } from './lib/DemoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { Reservation } from './components/Reservation';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';

// ─── Animated scrolling ticker banner ────────────────────────────────────────
function DemoBanner() {
  const { isDemo, businessName, city } = useDemo();
  if (!isDemo) return null;

  const items = [
    `🔒 DEMO PREVIEW`,
    `📍 ${businessName}`,
    `🏙️ ${city}`,
    `✨ This site is not live yet`,
    `💬 Contact us to publish it`,
    `🚀 Your brand. Your images. Live in 24h.`,
  ];

  // Duplicate for seamless loop
  const ticker = [...items, ...items, ...items];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'linear-gradient(90deg, #92400e 0%, #b45309 40%, #d97706 60%, #92400e 100%)',
        height: '36px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,200,80,0.25)',
      }}
    >
      {/* Fade masks on edges */}
      <div
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to right, #92400e, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to left, #92400e, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* Ticker track */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          animation: 'tickerScroll 28s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {ticker.map((item, i) => (
          <span
            key={i}
            style={{
              padding: '0 32px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#1c1917',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {item}
            <span style={{ opacity: 0.4, fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ─── Main layout ─────────────────────────────────────────────────────────────
function MainApp() {
  const { isDemo } = useDemo();
  return (
    <div
      className="min-h-screen relative selection:bg-brand-500/30 selection:text-brand-400 font-sans font-light bg-dark-600"
      style={isDemo ? { paddingTop: '36px' } : {}}
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
