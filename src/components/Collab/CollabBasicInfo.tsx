import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { FaTag, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CollabBasicInfoProps {
  category?: string | null;
  location?: string | null;
  previewImage?: unknown;
  documentId?: string;
  documentType?: string;
}

export default function CollabBasicInfo({
  category,
  location,
  previewImage,
  documentId,
  documentType,
}: CollabBasicInfoProps) {
  // Process image data
  const imageData = previewImage as { asset?: { _ref: string; _type: string }; alt?: string };

  return (
    <aside className='bg-white border border-gray-200 rounded-lg p-6'>
      {/* Profile Image */}
      <div className='flex justify-center mb-6'>
        <div
          className='relative w-[75%] h-[75%] max-w-[280px] max-h-[280px] lg:max-w-none lg:max-h-none aspect-square rounded-full overflow-hidden'
          {...createSanityDataAttribute(documentId, documentType, 'previewImage')}>
          <UnifiedImage
            src={imageData}
            alt={imageData?.alt || 'Collaboration profile'}
            mode="fill"
            sizeContext="card"
            objectFit="cover"
            sizes='(max-width: 768px) 75vw, (max-width: 1024px) 280px, 280px'
            fallback={
              <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-secondary to-brand-primary'>
                <FaUser className='text-white text-body-8xl' />
              </div>
            }
          />
        </div>
      </div>

      <Heading level='h3' className='sr-only'>
        General Info
      </Heading>
      <div className='space-y-3 text-center'>
        {category && (
          <div>
            <dt className='text-body-base font-medium text-gray-500'>Category</dt>
            <dd className='text-body-lg text-gray-900 flex justify-center items-center space-x-3'>
              <FaTag className='text-brand-secondary text-body-lg flex-shrink-0' />
              <span>{category}</span>
            </dd>
          </div>
        )}
        {location && (
          <div>
            <dt className='text-body-base font-medium text-gray-500'>Location</dt>
            <dd className='text-body-lg text-gray-900 flex justify-center items-center space-x-3'>
              <FaMapMarkerAlt className='text-brand-secondary text-body-lg flex-shrink-0' />
              <span>{location}</span>
            </dd>
          </div>
        )}
      </div>
    </aside>
  );
}
