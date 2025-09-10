'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change, unless there's a hash in the URL
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;