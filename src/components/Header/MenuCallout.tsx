'use client';

import React, { useState, useEffect } from 'react';

interface MenuCalloutProps {
  text?: string;
  showDelay?: number; // milliseconds before showing
  hideDelay?: number; // milliseconds before hiding
  isVisible?: boolean; // external control
  onShow?: () => void;
  onHide?: () => void;
}

const MenuCallout = ({
  text = 'Explore more content',
  showDelay = 1000,
  hideDelay = 5000,
  isVisible: externalVisible,
  onShow,
  onHide,
}: MenuCalloutProps) => {
  const [animationState, setAnimationState] = useState<
    'hidden' | 'entering' | 'pulsing' | 'visible' | 'exiting'
  >('hidden');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // If already shown once, don't show again
    if (hasShown && externalVisible === undefined) {
      return;
    }

    // If externally controlled, use that state
    if (externalVisible !== undefined) {
      if (externalVisible && animationState === 'hidden') {
        setAnimationState('entering');
        setTimeout(() => setAnimationState('pulsing'), 50);
        setTimeout(() => setAnimationState('visible'), 400);
      } else if (
        !externalVisible &&
        (animationState === 'visible' ||
          animationState === 'entering' ||
          animationState === 'pulsing')
      ) {
        setAnimationState('exiting');
        setTimeout(() => setAnimationState('hidden'), 300);
      }
      return;
    }

    // Auto-show logic (only once)
    const showTimer = setTimeout(() => {
      setAnimationState('entering');
      setHasShown(true);
      onShow?.();

      // Start pulse animation
      setTimeout(() => setAnimationState('pulsing'), 50);

      // Settle to visible state
      setTimeout(() => setAnimationState('visible'), 400);

      // Auto-hide after hideDelay
      const hideTimer = setTimeout(() => {
        setAnimationState('exiting');
        setTimeout(() => {
          setAnimationState('hidden');
          onHide?.();
        }, 300);
      }, hideDelay);

      return () => clearTimeout(hideTimer);
    }, showDelay);

    return () => clearTimeout(showTimer);
  }, [showDelay, hideDelay, externalVisible, animationState, hasShown, onShow, onHide]);

  if (animationState === 'hidden') {
    return null;
  }

  const getAnimationClasses = () => {
    switch (animationState) {
      case 'entering':
        return 'opacity-0 scale-100 translate-y-2';
      case 'pulsing':
        return 'opacity-100 scale-110 translate-y-0';
      case 'visible':
        return 'opacity-100 scale-100 translate-y-0';
      case 'exiting':
        return 'opacity-0 scale-95 translate-y-1';
      default:
        return 'opacity-0 scale-95';
    }
  };

  return (
    <div
      className={`absolute top-[120%] -right-2 mt-2 z-50 transition-all ${
        animationState === 'pulsing' ? 'duration-200' : 'duration-300'
      } ease-out ${getAnimationClasses()}`}
      role='tooltip'
      aria-live='polite'>
      {/* Speech bubble */}
      <div className='relative'>
        {/* Arrow pointing up to hamburger */}
        <div className='absolute -top-2 right-4 w-4 h-4 bg-black transform rotate-45 shadow-lg'></div>

        {/* Callout content */}
        <div className='relative bg-black rounded-lg shadow-xl px-4 py-3 min-w-max'>
          {/* Subtle color animation background */}
          <div
            className={`absolute inset-0 rounded-lg transition-all duration-1000 ${
              animationState === 'visible'
                ? 'bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5'
                : 'bg-transparent'
            }`}></div>

          {/* Text content */}
          <div className='relative z-10'>
            <span className='font-medium text-white whitespace-nowrap'>{text}</span>
          </div>

          {/* Subtle glow effect */}
          <div
            className={`absolute inset-0 rounded-lg transition-all duration-1000 ${
              animationState === 'visible' ? 'shadow-lg shadow-brand-primary/10' : 'shadow-none'
            }`}></div>
        </div>
      </div>
    </div>
  );
};

export default MenuCallout;
