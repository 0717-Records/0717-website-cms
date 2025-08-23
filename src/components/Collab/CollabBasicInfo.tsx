import React from 'react';
import Image from 'next/image';
import { stegaClean } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';
import { FaMusic, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Heading from '../Typography/Heading/Heading';

interface CollabBasicInfoProps {
  genre?: string | null;
  location?: string | null;
  previewImage?: unknown;
}

export default function CollabBasicInfo({ genre, location, previewImage }: CollabBasicInfoProps) {
  // Process image data
  const imageData = previewImage as { asset?: { _ref: string; _type: string }; alt?: string };
  const imageUrl = imageData?.asset ? urlFor(imageData.asset).width(120).height(120).url() : null;

  return (
    <aside className='bg-white border border-gray-200 rounded-lg p-6'>
      {/* Profile Image */}
      <div className='flex justify-center mb-6'>
        <div className='relative w-full h-full aspect-square rounded-full overflow-hidden'>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={stegaClean(imageData?.alt) || 'Collaboration profile'}
              fill
              sizes='80px'
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-secondary to-brand-primary'>
              <FaUser className='text-white text-8xl' />
            </div>
          )}
        </div>
      </div>

      <Heading level='h3' className='sr-only'>General Info</Heading>
      <div className='space-y-3'>
        {genre && (
          <div>
            <dt className='text-body-sm font-medium text-gray-500'>Genre</dt>
            <dd className='text-body-base text-gray-900 flex items-center space-x-3'>
              <FaMusic className='text-brand-secondary text-lg flex-shrink-0' />
              <span>{stegaClean(genre)}</span>
            </dd>
          </div>
        )}
        {location && (
          <div>
            <dt className='text-body-sm font-medium text-gray-500'>Location</dt>
            <dd className='text-body-base text-gray-900 flex items-center space-x-3'>
              <FaMapMarkerAlt className='text-brand-secondary text-lg flex-shrink-0' />
              <span>{stegaClean(location)}</span>
            </dd>
          </div>
        )}
      </div>
    </aside>
  );
}
