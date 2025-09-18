import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * @param isLocked - Whether to lock the body scroll
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Apply CSS-based scroll prevention
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position and styles
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Restore scroll position immediately without requestAnimationFrame
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};
