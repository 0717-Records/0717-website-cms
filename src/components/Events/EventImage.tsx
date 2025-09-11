import React from 'react';
import Image from 'next/image';
import PastEventOverlay from './PastEventOverlay';

interface EventImageProps {
  image?: string | null;
  title: string;
  isPast: boolean;
  pastEventText?: string | null;
  sizes: string;
  fallbackIconSize?: string;
}

const EventImage = ({ 
  image, 
  title, 
  isPast, 
  pastEventText, 
  sizes,
  fallbackIconSize = 'text-body-3xl'
}: EventImageProps) => {
  if (image) {
    return (
      <>
        <Image
          src={image}
          alt={`${title} event poster`}
          fill
          sizes={sizes}
          className={`object-cover transition-all duration-300 ${isPast ? 'brightness-30' : ''}`}
          priority
        />
        {isPast && (
          <PastEventOverlay
            text={pastEventText || 'This Event Has Been.\nThanks For Your Support.'}
          />
        )}
      </>
    );
  }

  return (
    <div className='w-full h-full relative'>
      <div
        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${isPast ? 'brightness-30' : ''}`}>
        <div className='text-center text-white/70'>
          <div className={`${fallbackIconSize} mb-1`}>🎭</div>
        </div>
      </div>
      {isPast && (
        <PastEventOverlay
          text={pastEventText || 'This Event Has Been.\nThanks For Your Support.'}
        />
      )}
    </div>
  );
};

export default EventImage;