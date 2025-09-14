'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePageLoad } from '@/contexts/PageLoadContext';

export default function NavigationScroll() {
  const pathname = usePathname();
  const { isPageReady } = usePageLoad();
  const hasScrolledRef = useRef(false);
  const currentHashRef = useRef('');

  useEffect(() => {
    // Update current hash whenever pathname changes
    currentHashRef.current = window.location.hash;
    hasScrolledRef.current = false;
  }, [pathname]);

  useEffect(() => {
    // If we've already scrolled for this hash, don't scroll again
    if (hasScrolledRef.current && currentHashRef.current === window.location.hash) {
      return;
    }

    // If there's no hash, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      hasScrolledRef.current = true;
      return;
    }

    const hash = window.location.hash;
    const targetId = hash.substring(1); // Remove the # symbol

    const scrollToElement = (element: Element) => {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'instant' });
        hasScrolledRef.current = true;
      });
    };

    const findAndScrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        scrollToElement(element);
        return true;
      }
      return false;
    };

    // If page is ready, try to scroll immediately
    if (isPageReady) {
      if (findAndScrollToElement()) {
        return;
      }
    }

    // Use MutationObserver to watch for the element being added to the DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          for (const node of addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // Check if the added element is our target or contains our target
              if (element.id === targetId || element.querySelector(`#${targetId}`)) {
                if (findAndScrollToElement()) {
                  observer.disconnect();
                  return;
                }
              }
            }
          }
        }
      }
    });

    // Start observing DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also listen for window load as a fallback
    const handleLoad = () => {
      if (!hasScrolledRef.current) {
        findAndScrollToElement();
      }
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup timeout - stop trying after 10 seconds
    const cleanup = setTimeout(() => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
    }, 10000);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
      clearTimeout(cleanup);
    };
  }, [pathname, isPageReady]);

  return null;
}
