import React from 'react';
import FavouriteGrid from '../Favourites/FavouriteGrid';
import type { FAVOURITES_ALL_QUERYResult } from '@/sanity/types';

interface FavouriteBlockProps {
  favourites: FAVOURITES_ALL_QUERYResult;
  itemsPerRow?: '3' | '4';
  favouriteListType?: 'automatic' | 'manual';
  selectedFavourites?: FAVOURITES_ALL_QUERYResult;
}

const FavouriteBlock: React.FC<FavouriteBlockProps> = ({
  favourites,
  itemsPerRow = '3',
  favouriteListType = 'automatic',
  selectedFavourites,
}) => {
  // Determine which favourites to display based on list type
  let displayFavourites: FAVOURITES_ALL_QUERYResult;

  if (favouriteListType === 'manual' && selectedFavourites) {
    // Use manually selected favourites in the order they were selected
    displayFavourites = selectedFavourites;
  } else {
    // Use automatic mode - get enough favourites to fill a row based on itemsPerRow
    const maxItems = parseInt(itemsPerRow, 10);
    displayFavourites = (favourites || []).slice(0, maxItems);
  }

  return (
    <FavouriteGrid
      favourites={displayFavourites}
      itemsPerRow={itemsPerRow}
      showViewAllButton={true}
      viewAllUrl="/favourites"
    />
  );
};

export default FavouriteBlock;
