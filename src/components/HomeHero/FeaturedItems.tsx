import React from 'react';
import Image from 'next/image';
import { getImageDimensions, urlFor } from '@/sanity/lib/image';
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
    <div className={`w-full flex flex-wrap justify-center gap-4`}>
      {validImages.map((image, index) => {
        const dimensions = getImageDimensions(image as { asset: { _ref: string } });
        const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;
        const isPortrait = aspectRatio <= 1;

        return (
          <div
            key={index}
            className={`relative w-full landscape:h-[45vh] landscape:w-auto ${isPortrait ? 'max-w-[300px] landscape:max-w-none' : 'max-w-[2000px] landscape:max-w-full'}`}
            style={{ aspectRatio: aspectRatio }}>
            <Image
              src={urlFor(image).width(2000).url()}
              alt={image.alt || 'Featured item'}
              fill
              className='object-contain'
              sizes='(max-width: 768px) 90vw, 400px'
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedItems;
