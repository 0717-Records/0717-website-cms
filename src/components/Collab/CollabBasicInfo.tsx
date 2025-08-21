import React from 'react';
import { stegaClean } from 'next-sanity';

interface CollabBasicInfoProps {
  genre?: string | null;
  location?: string | null;
}

export default function CollabBasicInfo({ genre, location }: CollabBasicInfoProps) {
  // Don't render if no info to show
  if (!genre && !location) {
    return null;
  }

  return (
    <aside className='bg-white border border-gray-200 rounded-lg p-6'>
      <h3 className='text-h4 font-bold text-gray-900 mb-4'>Info</h3>
      <div className='space-y-3'>
        {genre && (
          <div>
            <dt className='text-body-sm font-medium text-gray-500'>Genre</dt>
            <dd className='text-body-base text-gray-900'>{stegaClean(genre)}</dd>
          </div>
        )}
        {location && (
          <div>
            <dt className='text-body-sm font-medium text-gray-500'>Location</dt>
            <dd className='text-body-base text-gray-900'>{stegaClean(location)}</dd>
          </div>
        )}
      </div>
    </aside>
  );
}