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

  // Calculate responsive scaling based on number of images
  const getImageClasses = (imageCount: number) => {
    if (imageCount === 1) {
      return 'flex-1'; // Single image: no max-width constraint, fill available space
    } else if (imageCount === 2) {
      return 'flex-1 max-w-sm'; // Two images: medium width each
    } else if (imageCount === 3) {
      return 'flex-1 max-w-xs'; // Three images: smaller width each  
    } else {
      return 'flex-1 max-w-[200px]'; // Four or more: very small width each
    }
  };

  const imageClasses = getImageClasses(validImages.length);

  return (
    <div className='flex flex-col md:flex-row border border-red-500 flex-1 items-center justify-center gap-2 md:gap-4 p-4'>
      {validImages.map((image, index) => (
        <div key={index} className={`relative h-48 md:h-full border border-blue-700 ${imageClasses}`}>
          <Image
            src={urlFor(image).width(1200).url()}
            alt={image.alt || 'Featured item'}
            fill
            className='object-contain'
            sizes='(max-width: 768px) 90vw, 25vw'
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className='flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center items-center w-full flex-1 border border-red-500'>
  //     {validImages.map((image, index) => (
  //       <div
  //         key={index}
  //         className='relative flex-shrink-0 md:w-auto md:flex-1 md:max-w-sm lg:max-w-md'>
  //         {/* Image container with minimum height on mobile */}
  //         <div className='relative min-h-[300px] border border-orange-500 rounded-lg overflow-hidden'>
  //           <Image
  //             src={urlFor(image).width(600).height(800).url()}
  //             alt={image.alt || `Featured item ${index + 1}`}
  //             fill
  //             className='object-contain rounded-lg'
  //             sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  //             priority={index === 0} // Prioritize first image for loading
  //           />
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default FeaturedItems;
