import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';

interface FeaturedItemsProps {
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
}
const FeaturedItems = ({ featuredImages }: FeaturedItemsProps) => {
  // Memoize validImages to prevent useEffect dependency changes
  const validImages = featuredImages?.filter((image) => image && image.asset && image.asset._ref);

  const hasValidImages =
    featuredImages && featuredImages.length > 0 && validImages && validImages.length > 0;

  if (!hasValidImages) {
    return null;
  }

  return (
    <div
      className={`flex border border-red-500 items-center justify-center gap-4 transition-opacity duration-700 ease-in-out`}>
      {validImages.map((image, index) => {
        return (
          <div key={index} className='relative border border-blue-700'>
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
