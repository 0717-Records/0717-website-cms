'use client';

import React from 'react';
import FavouriteItem from './FavouriteItem';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';
import CTA from '../UI/CTA';

interface FavouriteGridProps {
  favourites: FAVOURITES_ALL_QUERYResult;
  itemsPerRow?: '3' | '4';
  maxItems?: number;
  showViewAllButton?: boolean;
  viewAllUrl?: string;
}

const FavouriteGrid: React.FC<FavouriteGridProps> = ({
  favourites,
  itemsPerRow = '3',
  maxItems,
  showViewAllButton = false,
  viewAllUrl = '/favourites',
}) => {
  // Filter and limit favourites if maxItems is specified
  const displayFavourites = maxItems ? (favourites || []).slice(0, maxItems) : favourites || [];

  // Calculate grid classes based on itemsPerRow (matching CollabBlock pattern)
  const gridClasses =
    itemsPerRow === '4'
      ? 'w-[calc((100%-1*1rem)/2)] sm:w-[calc((100%-2*1rem)/3)] md:w-[calc((100%-3*1rem)/4)]'
      : 'w-[calc((100%-1*1rem)/2)] sm:w-[calc((100%-2*2rem)/3)]';

  if (displayFavourites.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='text-gray-400 text-h2 mb-4'>❤️</div>
        <p className='text-gray-500 text-body-lg'>
          No favourites available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div
        className={`flex flex-wrap justify-center ${itemsPerRow === '4' ? 'gap-x-4' : 'gap-x-4 sm:gap-x-8'} gap-y-8`}>
        {displayFavourites.map((favourite, index) => (
          <div
            key={favourite._id || `favourite-${index}`}
            className={`${gridClasses} flex-shrink-0 px-1 sm:px-4`}>
            <FavouriteItem favourite={favourite} itemsPerRow={itemsPerRow} />
          </div>
        ))}
      </div>

      {/* View All Favourites Button */}
      {showViewAllButton && (
        <div className='flex justify-center mt-8'>
          <CTA href={viewAllUrl} variant='outline'>
            View all favourites
          </CTA>
        </div>
      )}
    </div>
  );
};

export default FavouriteGrid;
