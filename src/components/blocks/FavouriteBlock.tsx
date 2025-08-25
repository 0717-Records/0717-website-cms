'use client';

import React, { useState } from 'react';
import FavouriteItem from '../Favourites/FavouriteItem';
import FavouriteModal from '../Modals/FavouriteModal';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';

type FavouriteData = FAVOURITES_ALL_QUERYResult[0];

interface FavouriteBlockProps {
  favourites: FAVOURITES_ALL_QUERYResult;
}

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
      <div className='text-center py-16'>
        <div className='text-gray-400 text-h2 mb-4'>❤️</div>
        <p className='text-gray-500 text-body-lg'>No favourites available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className='w-full'>
        {/* Grid using flexbox with responsive columns */}
        <div className='flex flex-wrap justify-center gap-x-4 gap-y-5 md:gap-x-8 md:gap-y-10'>
          {favourites.map((favourite) => (
            <div
              key={favourite._id}
              className='w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-4rem)] flex-shrink-0'>
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
