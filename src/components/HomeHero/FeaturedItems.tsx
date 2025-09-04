import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';

interface FeaturedItemsProps {
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
}

const FeaturedItems = ({ featuredImages }: FeaturedItemsProps) => {
  if (!featuredImages || featuredImages.length === 0) {
    return null;
  }

  // Filter out null/undefined images and images without proper asset reference
  const validImages = featuredImages.filter((image) => image && image.asset && image.asset._ref);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center items-center w-full h-full">
      {validImages.map((image, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 w-full md:w-auto md:flex-1 md:max-w-sm lg:max-w-md"
        >
          {/* Image container with minimum height on mobile */}
          <div className="relative min-h-[300px] md:h-full md:max-h-[60vh] lg:max-h-[70vh] w-full">
            <Image
              src={urlFor(image).width(600).height(800).url()}
              alt={image.alt || `Featured item ${index + 1}`}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0} // Prioritize first image for loading
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedItems;