'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { HeartIcon } from '@sanity/icons';
import FavouriteModal from '../Modals/FavouriteModal';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';

type FavouriteData = FAVOURITES_ALL_QUERYResult[0];

interface FavouriteBlockProps {
  favourites: FAVOURITES_ALL_QUERYResult;
}

const FavouriteItem: React.FC<{ 
  favourite: FavouriteData; 
  onClick: () => void; 
}> = ({ favourite, onClick }) => {
  const imageUrl = favourite.profileImage?.asset
    ? urlFor(favourite.profileImage.asset).width(300).height(300).quality(90).url()
    : null;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-lg"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${favourite.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}>
      
      <div className="text-center space-y-3">
        {/* Profile Image */}
        <div className="mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary transition-transform duration-200 group-hover:scale-110">
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={favourite.profileImage?.alt || `${favourite.name} profile image`}
              fill
              sizes="(max-width: 768px) 150px, 200px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <HeartIcon className="text-white text-3xl md:text-4xl" />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-h4 font-bold text-gray-900 transition-colors duration-200 group-hover:text-brand-primary">
          {favourite.name}
        </div>

        {/* Genre */}
        {favourite.genre && (
          <div className="text-body-base font-medium text-brand-secondary">
            {favourite.genre}
          </div>
        )}
      </div>
    </div>
  );
};

const FavouriteBlock: React.FC<FavouriteBlockProps> = ({ favourites }) => {
  const [selectedFavourite, setSelectedFavourite] = useState<FavouriteData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavouriteClick = (favourite: FavouriteData) => {
    setSelectedFavourite(favourite);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFavourite(null);
  };

  if (!favourites || favourites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-h2 mb-4">❤️</div>
        <p className="text-gray-500 text-body-lg">No favourites available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Grid using flexbox with responsive columns */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {favourites.map((favourite) => (
            <div 
              key={favourite._id} 
              className="w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1.333rem)] flex-shrink-0 max-w-[200px]">
              <FavouriteItem
                favourite={favourite}
                onClick={() => handleFavouriteClick(favourite)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFavourite && (
        <FavouriteModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          favourite={selectedFavourite}
        />
      )}
    </>
  );
};

export default FavouriteBlock;