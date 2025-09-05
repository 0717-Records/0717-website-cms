'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';

interface FeaturedItemsProps {
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

const FeaturedItems = ({ featuredImages }: FeaturedItemsProps) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize validImages to prevent useEffect dependency changes
  const validImages = useMemo(
    () => featuredImages?.filter((image) => image && image.asset && image.asset._ref) || [],
    [featuredImages]
  );

  const hasValidImages = featuredImages && featuredImages.length > 0 && validImages.length > 0;

  // Load image dimensions
  useEffect(() => {
    if (!hasValidImages) return;

    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        validImages.map(async (image) => {
          return new Promise<ImageDimensions>((resolve) => {
            const img = new globalThis.Image();
            img.onload = () => {
              resolve({
                width: img.width,
                height: img.height,
                aspectRatio: img.width / img.height,
              });
            };
            img.onerror = () => {
              // Fallback for failed loads - assume A4 portrait ratio
              resolve({
                width: 210,
                height: 297,
                aspectRatio: 210 / 297,
              });
            };
            img.src = urlFor(image).width(400).url(); // Small version for dimension detection
          });
        })
      );
      setImageDimensions(dimensions);
      setIsLoading(false); // All dimensions loaded, ready to show
    };

    loadImageDimensions();
  }, [hasValidImages, validImages]);

  if (!hasValidImages) {
    return null;
  }

  // Size containers to content width, not equal width - for A4 images to be close together
  return (
    <div
      className={`flex flex-col md:flex-row border border-red-500 flex-1 items-center justify-center gap-2 md:gap-4 transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
      {validImages.map((image, index) => {
        // Only use calculated dimensions if they're loaded, otherwise use reasonable fallback
        const width =
          !isLoading && imageDimensions[index] ? imageDimensions[index].aspectRatio : 0.707; // A4 fallback while loading

        return (
          <div
            key={index}
            className='relative border border-blue-700 h-48 md:h-full'
            style={{
              aspectRatio: width.toString(),
              flexShrink: 0,
            }}>
            <Image
              src={urlFor(image).width(800).url()}
              alt={image.alt || 'Featured item'}
              fill
              className='object-contain'
              sizes='(max-width: 768px) 90vw, 25vw'
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedItems;
