'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface HeroImage {
  imageUrl: string;
  altText: string;
}

interface HeroImagesProps {
  images: HeroImage[];
  duration?: number;
  onFirstImageLoaded?: () => void;
}

const HeroImages = ({ images, duration = 4000, onFirstImageLoaded }: HeroImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Track when each image loads
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
    
    // When first image loads, notify parent
    if (index === 0 && onFirstImageLoaded) {
      onFirstImageLoaded();
    }
  }, [onFirstImageLoaded]);

  // Transition to next image
  useEffect(() => {
    if (images.length <= 1) return; // Don't rotate if only one image

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, images.length]);

  // Don't render anything if no images
  if (images.length === 0) {
    return null;
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full z-10'>
      {images.map((image, index) => {
        const isCurrentImage = index === currentIndex;
        const isImageLoaded = loadedImages.has(index);
        
        // All images use smooth transitions
        const shouldUseTransition = true;
        
        // Show image if it's current AND loaded
        const shouldShow = isCurrentImage && isImageLoaded;
        
        return (
          <Image
            priority={index === 0}
            key={index}
            src={image.imageUrl}
            alt={image.altText || `Hero background image ${index + 1}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-center object-cover ${
              shouldUseTransition ? 'transition-opacity duration-1000 ease-in-out' : ''
            } ${
              shouldShow ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(index)}
          />
        );
      })}
    </div>
  );
};

export default HeroImages;
