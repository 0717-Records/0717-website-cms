'use client';

import { createContext, useContext, type ReactNode } from 'react';

interface SiteDataContextType {
  companyEmail?: string;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

interface SiteDataProviderProps {
  children: ReactNode;
  companyEmail?: string;
}

export function SiteDataProvider({ children, companyEmail }: SiteDataProviderProps) {
  return (
    <SiteDataContext.Provider value={{ companyEmail }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextType {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}