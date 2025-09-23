import React from 'react';
import FavouriteGrid from '../Favourites/FavouriteGrid';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';

interface FavouriteBlockProps {
  favourites: FAVOURITES_ALL_QUERYResult;
  rowSize?: 'small' | 'large';
  favouriteListType?: 'automatic' | 'manual';
  selectedFavourites?: FAVOURITES_ALL_QUERYResult;
  maxItemsPerBlock?: number;
}

const FavouriteBlock: React.FC<FavouriteBlockProps> = ({
  favourites,
  rowSize = 'large',
  favouriteListType = 'automatic',
  selectedFavourites,
  maxItemsPerBlock = 4,
}) => {
  // Determine which favourites to display based on list type
  let displayFavourites: FAVOURITES_ALL_QUERYResult;

  if (favouriteListType === 'manual' && selectedFavourites) {
    // Use manually selected favourites in the order they were selected
    displayFavourites = selectedFavourites;
  } else {
    // Use automatic mode - limit by maxItemsPerBlock, not just by row size
    displayFavourites = (favourites || []).slice(0, maxItemsPerBlock);
  }

  return (
    <FavouriteGrid
      favourites={displayFavourites}
      rowSize={rowSize}
      showViewAllButton={true}
      viewAllUrl="/favourites"
    />
  );
};

export default FavouriteBlock;
