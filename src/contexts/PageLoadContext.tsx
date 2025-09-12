'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface PageLoadContextType {
  isPageReady: boolean;
  setPageReady: () => void;
}

const PageLoadContext = createContext<PageLoadContextType | undefined>(undefined);

export const usePageLoad = (): PageLoadContextType => {
  const context = useContext(PageLoadContext);
  if (!context) {
    throw new Error('usePageLoad must be used within a PageLoadProvider');
  }
  return context;
};

interface PageLoadProviderProps {
  children: React.ReactNode;
}

export const PageLoadProvider: React.FC<PageLoadProviderProps> = ({ children }) => {
  const [isPageReady, setIsPageReady] = useState(false);

  const setPageReady = useCallback(() => {
    setIsPageReady(true);
  }, []);

  // Fallback timeout to ensure footer shows even if setPageReady isn't called
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!isPageReady) {
        setIsPageReady(true);
      }
    }, 2000); // 2 second fallback

    return () => clearTimeout(fallbackTimer);
  }, [isPageReady]);

  return (
    <PageLoadContext.Provider value={{ isPageReady, setPageReady }}>
      {children}
    </PageLoadContext.Provider>
  );
};