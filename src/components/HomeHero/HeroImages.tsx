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
  onFirstImageLoaded?: (loadedImmediately: boolean) => void;
}

const HeroImages = ({ images, duration = 4000, onFirstImageLoaded }: HeroImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [enableTransitions, setEnableTransitions] = useState(false);

  // Track when each image loads
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
    
    // When first image loads, notify parent and decide about transitions
    if (index === 0 && onFirstImageLoaded) {
      onFirstImageLoaded(true); // For now, assume it's immediate and let parent handle
    }
  }, [onFirstImageLoaded]);

  // Enable transitions after a very short delay to allow first image to appear immediately if cached
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableTransitions(true);
    }, 50); // Very short delay
    
    return () => clearTimeout(timer);
  }, []);

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
        
        // First image: no transition initially to appear immediately, then enable transitions
        // Other images: always use transitions (after transitions are enabled)
        const shouldUseTransition = enableTransitions;
        
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
