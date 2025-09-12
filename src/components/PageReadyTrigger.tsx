'use client';

import { useEffect } from 'react';
import { usePageLoad } from '@/contexts/PageLoadContext';

const PageReadyTrigger = () => {
  const { setPageReady } = usePageLoad();

  useEffect(() => {
    // Trigger page ready after a short delay to ensure content has rendered
    // This happens after the initial render and any loading states
    const timer = setTimeout(() => {
      setPageReady();
    }, 100); // Short delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [setPageReady]);

  return null; // This component doesn't render anything
};

export default PageReadyTrigger;