'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // If there's no hash, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const hash = window.location.hash;
    const targetId = hash.substring(1); // Remove the # symbol

    const scrollToElement = (element: Element) => {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'instant' });
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

    // Try to find the element immediately
    if (findAndScrollToElement()) {
      return;
    }

    // If not found, wait for DOM to be ready
    if (document.readyState !== 'complete') {
      const handleLoad = () => {
        if (findAndScrollToElement()) {
          window.removeEventListener('load', handleLoad);
        }
      };
      window.addEventListener('load', handleLoad);
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

    // Cleanup timeout - stop trying after 5 seconds
    const cleanup = setTimeout(() => {
      observer.disconnect();
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(cleanup);
    };
  }, [pathname]);

  return null;
}
