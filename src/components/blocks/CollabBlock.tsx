import React from 'react';
import Link from 'next/link';
import UnifiedImage from '@/components/UI/UnifiedImage';
import CTAEmailButton from '@/components/UI/CTAEmailButton';
import { UsersIcon } from '@sanity/icons';
import type { COLLABS_ALL_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CollabBlockProps {
  collabs: COLLABS_ALL_QUERYResult;
  itemsPerRow?: '3' | '4';
  showCTA?: boolean;
  ctaMessage?: string;
}

const CollabBlock = ({
  collabs,
  itemsPerRow = '3',
  showCTA = false,
  ctaMessage,
}: CollabBlockProps) => {
  // Calculate how many collabs to show (including CTA if enabled)
  const maxItems = parseInt(itemsPerRow, 10);
  const collabsToShow = showCTA ? maxItems - 1 : maxItems;
  const displayCollabs = collabs ? collabs.slice(0, collabsToShow) : [];

  // Calculate grid classes based on itemsPerRow
  const gridClasses =
    itemsPerRow === '4'
      ? 'w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-4rem)] lg:w-[calc(25%-6rem)]' // 4 items per row on large screens
      : 'w-[calc(50%-1.5rem)] sm:w-[calc(33.333%-4rem)]'; // 3 items per row on large screens

  if (displayCollabs.length === 0 && !showCTA) {
    return (
      <div className='text-center py-16'>
        <div className='text-gray-400 text-h2 mb-4'>🎵</div>
        <p className='text-gray-500 text-body-lg'>
          No collaborations available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex flex-wrap justify-center gap-x-4 gap-y-5 md:gap-x-8 md:gap-y-10'>
        {/* Render collab items */}
        {displayCollabs.map((collab) => (
          <div key={collab._id} className={`${gridClasses} flex-shrink-0`}>
            <Link
              href={`/collabs/${collab.slug?.current || ''}`}
              className='group cursor-pointer w-full transition-all duration-200 focus:outline-none rounded-lg px-1 sm:px-4 block'
              aria-label={`View details for ${collab.name}`}>
              <div className='text-center space-y-3'>
                {/* Profile Image */}
                <div
                  {...createSanityDataAttribute(collab._id, 'collab', 'previewImage')}
                  className='mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-brand-secondary to-brand-primary transition-transform duration-200 group-hover:scale-105'>
                  <UnifiedImage
                    src={collab.previewImage}
                    alt={collab.previewImage?.alt || `${collab.name} profile image`}
                    mode='fill'
                    sizeContext={itemsPerRow === '4' ? 'thumbnail' : 'profile'}
                    objectFit='cover'
                    sizes={itemsPerRow === '4' ? '(max-width: 768px) 120px, 160px' : '(max-width: 768px) 150px, 200px'}
                    fallback={
                      <div className='w-full h-full flex items-center justify-center'>
                        <UsersIcon className='text-white text-body-3xl md:text-body-4xl' />
                      </div>
                    }
                  />
                </div>

                {/* Name */}
                <div
                  {...createSanityDataAttribute(collab._id, 'collab', 'name')}
                  className={`${itemsPerRow === '4' ? 'text-body-lg' : 'text-h6'} font-bold text-gray-900 transition-colors duration-200 group-hover:underline`}>
                  {collab.name}
                </div>

                {/* Category (Genre) */}
                {collab.category && (
                  <div
                    {...createSanityDataAttribute(collab._id, 'collab', 'category')}
                    className={`${itemsPerRow === '4' ? 'text-body-sm' : 'text-body-base'} font-medium text-brand-secondary`}>
                    {collab.category}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}

        {/* Collab Help CTA - appears at the end of the collabs list */}
        {showCTA && ctaMessage && (
          <div className={`${gridClasses} flex-shrink-0`}>
            <div className='group cursor-pointer w-full transition-all duration-200 focus:outline-none rounded-lg px-1 sm:px-4'>
              <div className='text-center space-y-3'>
                {/* Handshake Icon with gradient background */}
                <div className='mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-card-gradient flex items-center justify-center transition-transform duration-200 group-hover:scale-105'>
                  <div className={`${itemsPerRow === '4' ? 'text-body-6xl' : 'text-body-8xl'}`}>🤝</div>
                </div>

                {/* CTA Message */}
                <div className={`${itemsPerRow === '4' ? 'text-body-sm' : 'text-body-base'} text-gray-700 leading-relaxed whitespace-pre-line px-2`}>
                  {ctaMessage}
                </div>

                {/* CTA Email Button */}
                <div className='mt-4'>
                  <CTAEmailButton
                    textClasses={itemsPerRow === '4' ? 'text-body-xs' : 'text-body-sm'}
                    className='scale-90'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollabBlock;