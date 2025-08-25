'use client';

import React from 'react';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { HeartIcon } from '@sanity/icons';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';

type FavouriteData = FAVOURITES_ALL_QUERYResult[0];

interface FavouriteItemProps {
  favourite: FavouriteData;
  onClick: () => void;
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({ favourite, onClick }) => {
  const imageUrl = favourite.profileImage?.asset
    ? urlFor(favourite.profileImage.asset).width(300).height(300).quality(90).url()
    : null;

  return (
    <div
      onClick={onClick}
      className='group cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-lg px-1 sm:px-4'
      tabIndex={0}
      role='button'
      aria-label={`View details for ${favourite.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}>
      <div className='text-center space-y-3'>
        {/* Profile Image */}
        <div className='mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary transition-transform duration-200 group-hover:scale-105'>
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={favourite.profileImage?.alt || `${favourite.name} profile image`}
              fill
              sizes='(max-width: 768px) 150px, 200px'
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <HeartIcon className='text-white text-3xl md:text-4xl' />
            </div>
          )}
        </div>

        {/* Name */}
        <div className='text-h6 font-bold text-gray-900 transition-colors duration-200 group-hover:underline'>
          {favourite.name}
        </div>

        {/* Genre */}
        {favourite.genre && (
          <div className='text-body-base font-medium text-brand-secondary'>{favourite.genre}</div>
        )}
      </div>
    </div>
  );
};

export default FavouriteItem;
