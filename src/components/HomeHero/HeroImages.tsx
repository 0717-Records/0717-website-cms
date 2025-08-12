'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroImage {
  imageUrl: string;
  altText: string;
}

interface HeroImagesProps {
  images: HeroImage[];
  duration?: number;
}

const HeroImages = ({ images, duration = 4000 }: HeroImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // Don't rotate if only one image

    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);
    return () => {
      if (newInterval) clearInterval(newInterval);
    };
  }, [duration, images.length]);

  return (
    <div className='absolute top-0 left-0 w-full h-full z-10'>
      {images.map((image, index) => {
        return (
          <Image
            priority={index === 0}
            key={index}
            src={image.imageUrl}
            alt={image.altText || 'Rotating hero image'}
            fill
            className={`absolute top-0 left-0 w-full h-full transition duration-1000 object-center object-cover ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}
    </div>
  );
};

export default HeroImages;
