import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaUser } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import type { COLLABS_ALL_QUERYResult } from '@/sanity/types';
import CTA from '../UI/CTA';

type CollabData = COLLABS_ALL_QUERYResult[0];

interface CollabCardProps extends CollabData {
  ctaText: string;
}

const CollabCard = ({
  name,
  slug,
  category,
  location,
  previewImage,
  shortDescription,
  useShortDescriptionForCards,
  cardDescription,
  ctaText,
}: CollabCardProps) => {
  if (!slug?.current) {
    return null;
  }

  const collabUrl = `/collabs/${slug.current}`;
  const displayDescription =
    useShortDescriptionForCards !== false ? shortDescription : cardDescription || shortDescription;
  const imageUrl = previewImage?.asset
    ? urlFor(previewImage.asset).width(400).height(400).quality(90).url()
    : null;

  return (
    <Link
      href={collabUrl}
      className='group block w-full bg-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 h-full'>
      <div className='flex flex-col h-full p-6'>
        <div className='flex-1 space-y-4'>
          {/* Preview Image */}
          <div className='flex justify-center'>
            <div className='relative w-[75%] max-w-[300px] aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary'>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={previewImage?.alt || `${name || 'Collaboration'} profile image`}
                  fill
                  sizes='128px'
                  className='object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center'>
                  <FaUser className='text-white text-body-4xl' />
                </div>
              )}
            </div>
          </div>

          {/* Collab Title */}
          <div className='text-center'>
            <div className='text-h4 font-bold text-gray-900'>
              {name || 'Untitled Collaboration'}
            </div>
          </div>

          {/* Category */}
          {category && (
            <div className='text-center'>
              <p className='text-body-lg font-bold text-brand-secondary'>{category}</p>
            </div>
          )}

          {/* Location */}
          {location && (
            <div className='text-center flex items-center justify-center gap-2'>
              <FaLocationDot className='text-brand-secondary' />
              <p className='text-body-base text-gray-500'>{location}</p>
            </div>
          )}

          {/* Description */}
          {displayDescription && (
            <div className='text-center'>
              <p className='text-body-base text-text-subtle line-clamp-3'>{displayDescription}</p>
            </div>
          )}
        </div>
        {/* CTA Button pinned to bottom */}
        <CTA as='button' aria-label={ctaText} className='mt-8 m-auto'>
          {ctaText}
        </CTA>
      </div>
    </Link>
  );
};

export default CollabCard;
