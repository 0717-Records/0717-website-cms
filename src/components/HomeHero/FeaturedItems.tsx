'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';

interface FeaturedItemsProps {
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
}

const FeaturedItems = ({ featuredImages }: FeaturedItemsProps) => {
  const [imageAspectRatios, setImageAspectRatios] = useState<number[]>([]);
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

    const loadImageAspectRatios = async () => {
      const aspectRatios = await Promise.all(
        validImages.map(async (image) => {
          return new Promise<number>((resolve) => {
            const img = new globalThis.Image();
            img.onload = () => {
              resolve(img.width / img.height);
            };
            img.onerror = () => {
              // Fallback for failed loads - assume A4 portrait ratio
              resolve(210 / 297);
            };
            img.src = urlFor(image).width(400).url(); // Small version for dimension detection
          });
        })
      );
      setImageAspectRatios(aspectRatios);
      setIsLoading(false); // All aspect ratios loaded, ready to show
    };

    loadImageAspectRatios();
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
        // Only use calculated aspect ratios if they're loaded, otherwise use reasonable fallback
        const aspectRatio =
          !isLoading && imageAspectRatios[index] ? imageAspectRatios[index] : 0.707; // A4 fallback while loading

        return (
          <div
            key={index}
            className='relative border border-blue-700 h-48 md:h-full'
            style={{
              aspectRatio: aspectRatio.toString(),
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
