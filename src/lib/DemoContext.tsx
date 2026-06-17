import React, { createContext, useContext, useMemo } from 'react';

export type DemoConfig = {
  businessName: string;
  city: string;
  phone: string;
  cuisine: string;
  isDemo: boolean;
  /** All images from ?images=url1,url2,url3,... */
  images: string[];
  /** Convenience getters */
  heroImage: string;
  aboutImage1: string;
  aboutImage2: string;
  galleryImages: string[];
};

const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop';
const FALLBACK_ABOUT1 =
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop';
const FALLBACK_ABOUT2 =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop';

const DEFAULT: DemoConfig = {
  businessName: 'BASTA',
  city: 'Doha',
  phone: '97450001866',
  cuisine: 'Authentic Cuisine',
  isDemo: false,
  images: [],
  heroImage: FALLBACK_HERO,
  aboutImage1: FALLBACK_ABOUT1,
  aboutImage2: FALLBACK_ABOUT2,
  galleryImages: [],
};

const DemoContext = createContext<DemoConfig>(DEFAULT);

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const config = useMemo<DemoConfig>(() => {
    const params = new URLSearchParams(window.location.search);

    const name    = params.get('name');
    const city    = params.get('city');
    const phone   = params.get('phone');
    const cuisine = params.get('cuisine');

    // ?images=url1,url2,url3  (comma-separated, URL-encoded per URL)
    const imagesRaw = params.get('images') ?? '';
    const images = imagesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const heroImage   = images[0] ?? FALLBACK_HERO;
    const aboutImage1 = images[1] ?? FALLBACK_ABOUT1;
    const aboutImage2 = images[2] ?? FALLBACK_ABOUT2;
    const galleryImages = images.slice(3);

    return {
      businessName: name ? name.toUpperCase() : 'BASTA',
      city:         city    ?? 'Doha',
      phone:        phone   ?? '97450001866',
      cuisine:      cuisine ?? 'Authentic Cuisine',
      isDemo:       !!(name || city || phone || images.length),
      images,
      heroImage,
      aboutImage1,
      aboutImage2,
      galleryImages,
    };
  }, []);

  return (
    <DemoContext.Provider value={config}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
