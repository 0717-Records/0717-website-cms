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

  // Determine if images should wrap based on total width demand
  const shouldWrap = () => {
    if (
      isLoading ||
      imageDimensions.length === 0 ||
      imageDimensions.length !== validImages.length
    ) {
      return false;
    }

    const hasInvalidDimensions = imageDimensions.some(
      (dim) => !dim || typeof dim.aspectRatio !== 'number'
    );
    if (hasInvalidDimensions) {
      return false;
    }

    // Test height and calculate total width demand
    const testHeight = 400;
    const gap = 16;
    const totalGaps = (imageDimensions.length - 1) * gap;

    const naturalWidths = imageDimensions.map((dim) => testHeight * dim.aspectRatio);
    const totalNaturalWidth = naturalWidths.reduce((sum, w) => sum + w, 0) + totalGaps;

    // Wrapping threshold - if total width would exceed this, wrap
    const wrapThreshold = 1200;

    return totalNaturalWidth > wrapThreshold;
  };

  // Calculate optimal sizing - different logic for wrapping vs non-wrapping
  const calculateImageSizes = () => {
    if (
      isLoading ||
      imageDimensions.length === 0 ||
      imageDimensions.length !== validImages.length
    ) {
      return { sizes: validImages.map(() => ({ width: 200, height: 280 })), shouldWrap: false };
    }

    const hasInvalidDimensions = imageDimensions.some(
      (dim) => !dim || typeof dim.aspectRatio !== 'number'
    );
    if (hasInvalidDimensions) {
      return { sizes: validImages.map(() => ({ width: 200, height: 280 })), shouldWrap: false };
    }

    const willWrap = shouldWrap();

    if (!willWrap) {
      // No wrapping: use relative sizing that fits within container
      // For single image, make it larger; for multiple images, scale to fit
      const isSingleImage = imageDimensions.length === 1;
      const baseHeight = isSingleImage ? 350 : 300; // Single image gets more height

      const gap = 16;
      const totalGaps = (imageDimensions.length - 1) * gap;

      const naturalWidths = imageDimensions.map((dim) => baseHeight * dim.aspectRatio);
      const totalNaturalWidth = naturalWidths.reduce((sum, w) => sum + w, 0) + totalGaps;

      const maxContainerWidth = 1200;
      const scaleFactor =
        totalNaturalWidth > maxContainerWidth ? maxContainerWidth / totalNaturalWidth : 1;

      const sizes = imageDimensions.map((dim) => ({
        width: baseHeight * dim.aspectRatio * scaleFactor,
        height: baseHeight * scaleFactor,
      }));

      return { sizes, shouldWrap: false };
    } else {
      // Wrapping: size for optimal wrapping layout
      const wrappingHeight = 250; // Smaller for wrapping to fit more rows
      const sizes = imageDimensions.map((dim) => ({
        width: wrappingHeight * dim.aspectRatio,
        height: wrappingHeight,
      }));

      return { sizes, shouldWrap: true };
    }
  };

  const { sizes: imageSizes, shouldWrap: isWrapping } = calculateImageSizes();

  if (!hasValidImages) {
    return null;
  }

  // For single image, use flex-based sizing instead of fixed pixels
  const isSingleImage = validImages.length === 1;

  if (isSingleImage && !isLoading && imageDimensions.length > 0) {
    const aspectRatio = imageDimensions[0].aspectRatio;
    return (
      <div
        ref={containerRef}
        className={`flex flex-row border border-red-500 h-full items-center justify-center transition-opacity duration-700 ease-in-out max-w-full ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
        <div
          className='relative border border-blue-700 h-full max-w-full'
          style={{
            aspectRatio: aspectRatio.toString(),
            flexShrink: 0,
          }}>
          <Image
            src={urlFor(validImages[0]).width(800).url()}
            alt={validImages[0].alt || 'Featured item'}
            fill
            className='object-contain'
            sizes='50vw'
            priority={true}
          />
        </div>
      </div>
    );
  }

  // For multiple images, use the calculated sizing
  return (
    <div
      ref={containerRef}
      className={`flex ${isWrapping ? 'flex-wrap' : 'flex-row'} border border-red-500 ${isWrapping ? 'min-h-full' : 'flex-grow'} items-center justify-center gap-4 transition-opacity duration-700 ease-in-out ${
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
