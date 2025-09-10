'use client';

import React, { useEffect, useState } from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import Image from 'next/image';

interface LoadingOverlayProps {
  isLoading?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useBodyScrollLock(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      // Small delay to ensure component is rendered, then start fade in
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      // Start fade out
      setIsVisible(false);
      // Wait for fade out animation to complete before removing from DOM
      setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match the CSS transition duration
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <>
      <div className='h-screen'>
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] sm:w-[500px] sm:h-[500px]'>
          <Image
            src={'/images/logo-black-on-transparent.png'}
            alt='07:17 Records Logo'
            fill
            className={`object-contain drop-shadow-lg drop-shadow-black/40 opacity-30`}
          />
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        role='dialog'
        aria-modal='true'
        aria-label='Page loading'>
        {/* Black overlay with reduced opacity */}
        <div className='absolute inset-0 bg-black/70' />

        {/* Spinner in center */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative'>
            {/* Outer ring - Brand Secondary */}
            <div
              className='w-16 h-16 border-4 border-transparent rounded-full animate-spin'
              style={{
                borderTopColor: '#f4a300', // brand-secondary
                borderRightColor: '#f4a300',
              }}
            />
            {/* Inner ring - Brand Primary */}
            <div
              className='absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin'
              style={{
                borderTopColor: '#ffea00', // brand-primary
                borderLeftColor: '#ffea00',
                animationDirection: 'reverse',
                animationDuration: '1.5s',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingOverlay;
