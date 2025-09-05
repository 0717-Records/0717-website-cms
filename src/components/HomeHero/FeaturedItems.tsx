'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

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
      setIsLoading(false);
    };

    loadImageDimensions();
  }, [hasValidImages, validImages]);

  // Calculate optimal sizing to fit all images within container width
  const calculateImageSizes = () => {
    if (isLoading || imageDimensions.length === 0 || imageDimensions.length !== validImages.length) {
      return validImages.map(() => ({ width: 200, height: 280 })); // A4 fallback
    }

    // Ensure all dimensions are properly loaded
    const hasInvalidDimensions = imageDimensions.some(dim => !dim || typeof dim.aspectRatio !== 'number');
    if (hasInvalidDimensions) {
      return validImages.map(() => ({ width: 200, height: 280 })); // A4 fallback
    }

    // Assume available height from the container (you can adjust this)
    const availableHeight = 400; // This should match your container height
    const gap = 16; // 4 * 4px (gap-4)
    const totalGaps = (imageDimensions.length - 1) * gap;
    
    // Calculate what width each image would need at this height
    const naturalWidths = imageDimensions.map(dim => availableHeight * dim.aspectRatio);
    const totalNaturalWidth = naturalWidths.reduce((sum, w) => sum + w, 0) + totalGaps;
    
    // Assume max container width (you can make this dynamic)
    const maxContainerWidth = 1200; // Adjust based on your layout
    
    // If natural widths exceed container, scale everything down proportionally
    const scaleFactor = totalNaturalWidth > maxContainerWidth ? maxContainerWidth / totalNaturalWidth : 1;
    
    return imageDimensions.map(dim => ({
      width: (availableHeight * dim.aspectRatio) * scaleFactor,
      height: availableHeight * scaleFactor
    }));
  };

  const imageSizes = calculateImageSizes();

  if (!hasValidImages) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-row border border-red-500 flex-grow items-center justify-center gap-4 transition-opacity duration-700 ease-in-out ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
      {validImages.map((image, index) => {
        const size = imageSizes[index];
        
        return (
          <div
            key={index}
            className='relative border border-blue-700'
            style={{
              width: `${size.width}px`,
              height: `${size.height}px`,
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
