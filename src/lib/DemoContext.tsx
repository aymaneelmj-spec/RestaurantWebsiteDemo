import React, { createContext, useContext, useMemo } from 'react';

export type DemoImages = {
  hero: string;         // Main hero background
  about1: string;      // First about section image
  about2: string;      // Second about section image
  logo?: string;       // Optional logo URL
};

type DemoConfig = {
  businessName: string;
  city: string;
  phone: string;
  isDemo: boolean;
  images: DemoImages;
  cuisine: string;     // e.g. "Italian Cuisine", "Saudi Cuisine"
  instagram?: string;  // Instagram handle (without @)
};

// Default fallback images (Unsplash, neutral luxury restaurant)
const DEFAULT_IMAGES: DemoImages = {
  hero: '/mainBackground.jpg',
  about1: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop',
  about2: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
};

const DemoContext = createContext<DemoConfig>({
  businessName: 'BASTA',
  city: 'Dammam',
  phone: '96650001866',
  isDemo: false,
  images: DEFAULT_IMAGES,
  cuisine: 'Authentic Cuisine',
});

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const config = useMemo<DemoConfig>(() => {
    const params = new URLSearchParams(window.location.search);

    const name     = params.get('name');
    const city     = params.get('city');
    const phone    = params.get('phone');
    const cuisine  = params.get('cuisine');
    const instagram = params.get('instagram') ?? undefined;

    // Image params — pass encoded URLs: ?hero=https%3A%2F%2F...
    const heroImg   = params.get('img_hero');
    const about1Img = params.get('img_about1');
    const about2Img = params.get('img_about2');
    const logoImg   = params.get('img_logo') ?? undefined;

    const images: DemoImages = {
      hero:   heroImg   ?? DEFAULT_IMAGES.hero,
      about1: about1Img ?? DEFAULT_IMAGES.about1,
      about2: about2Img ?? DEFAULT_IMAGES.about2,
      logo:   logoImg,
    };

    return {
      businessName: name ? name.toUpperCase() : 'BASTA',
      city:         city     ?? 'Dammam',
      phone:        phone    ?? '96650001866',
      cuisine:      cuisine  ?? 'Authentic Cuisine',
      instagram,
      isDemo: !!(name || city || phone || heroImg || about1Img),
      images,
    };
  }, []);

  return (
    <DemoContext.Provider value={config}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);