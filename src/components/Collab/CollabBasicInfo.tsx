import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaMusic, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CollabBasicInfoProps {
  genre?: string | null;
  location?: string | null;
  previewImage?: unknown;
  documentId?: string;
  documentType?: string;
}

export default function CollabBasicInfo({ genre, location, previewImage, documentId, documentType }: CollabBasicInfoProps) {
  // Process image data
  const imageData = previewImage as { asset?: { _ref: string; _type: string }; alt?: string };
  // Request 3x size for crisp display on high-DPI screens (max container is 280px, so request 840px)
  const imageUrl = imageData?.asset ? urlFor(imageData.asset).width(840).height(840).quality(90).url() : null;

  return (
    <aside className='bg-white border border-gray-200 rounded-lg p-6'>
      {/* Profile Image */}
      <div className='flex justify-center mb-6'>
        <div 
          className='relative w-[75%] h-[75%] max-w-[280px] max-h-[280px] lg:max-w-none lg:max-h-none aspect-square rounded-full overflow-hidden'
          {...createSanityDataAttribute(documentId, documentType, 'previewImage')}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageData?.alt || 'Collaboration profile'}
              fill
              sizes='(max-width: 768px) 75vw, (max-width: 1024px) 280px, 280px'
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-secondary to-brand-primary'>
              <FaUser className='text-white text-8xl' />
            </div>
          )}
        </div>
      </div>

      <Heading level='h3' className='sr-only'>
        General Info
      </Heading>
      <div className='space-y-3'>
        {genre && (
          <div>
            <dt className='text-body-base font-medium text-gray-500'>Genre</dt>
            <dd className='text-body-lg text-gray-900 flex items-center space-x-3'>
              <FaMusic className='text-brand-secondary text-lg flex-shrink-0' />
              <span>{genre}</span>
            </dd>
          </div>
        )}
        {location && (
          <div>
            <dt className='text-body-base font-medium text-gray-500'>Location</dt>
            <dd className='text-body-lg text-gray-900 flex items-center space-x-3'>
              <FaMapMarkerAlt className='text-brand-secondary text-lg flex-shrink-0' />
              <span>{location}</span>
            </dd>
          </div>
        )}
      </div>
    </aside>
  );
}
