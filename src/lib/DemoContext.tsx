import React, { createContext, useContext, useMemo } from 'react';

type DemoConfig = {
  businessName: string;
  city: string;
  phone: string;
  isDemo: boolean;
};

const DemoContext = createContext<DemoConfig>({
  businessName: 'BASTA',
  city: 'Doha',
  phone: '97450001866',
  isDemo: false,
});

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const config = useMemo<DemoConfig>(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const city = params.get('city');
    const phone = params.get('phone');

    return {
      businessName: name ? name.toUpperCase() : 'BASTA',
      city: city ?? 'Doha',
      phone: phone ?? '97450001866',
      isDemo: !!(name || city || phone),
    };
  }, []);

  return (
    <DemoContext.Provider value={config}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
