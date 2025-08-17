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
      
      // Apply multiple scroll prevention methods
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Prevent touch scrolling
      const preventTouch = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      document.addEventListener('touchmove', preventTouch, { passive: false });
      
      return () => {
        // Restore scroll position and styles
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
        
        document.removeEventListener('touchmove', preventTouch);
      };
    }
  }, [isLocked]);
};