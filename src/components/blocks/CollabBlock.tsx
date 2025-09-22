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
      ? 'w-[calc((100%-1*2rem)/2)] sm:w-[calc((100%-2*1rem)/3)] md:w-[calc((100%-3*1rem)/4)]'
      : 'w-[calc((100%-1*2rem)/2)] sm:w-[calc((100%-2*2rem)/3)]';

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
      <div
        className={`flex flex-wrap justify-center ${itemsPerRow === '4' ? 'gap-x-4' : 'gap-x-4 sm:gap-x-8'} gap-y-8`}>
        {/* Render collab items */}
        {displayCollabs.map((collab) => (
          <div key={collab._id} className={`${gridClasses} flex-shrink-0 px-1 sm:px-4`}>
            <Link
              href={`/collabs/${collab.slug?.current || ''}`}
              className='group cursor-pointer w-full transition-all duration-200 focus:outline-none rounded-lg block'
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
                    sizeContext={'profile'}
                    objectFit='cover'
                    sizes={
                      itemsPerRow === '4'
                        ? '(max-width: 768px) 120px, 160px'
                        : '(max-width: 768px) 150px, 200px'
                    }
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
                  className={`text-h6 font-bold transition-colors duration-200 group-hover:underline`}>
                  {collab.name}
                </div>

                {/* Category (Genre) */}
                {collab.category && (
                  <div
                    {...createSanityDataAttribute(collab._id, 'collab', 'category')}
                    className={`font-medium text-brand-secondary`}>
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
            <div className='w-full'>
              <div className='text-center space-y-3 px-1 sm:px-4'>
                {/* Handshake Icon with gradient background */}
                <div className='mx-auto relative w-full aspect-square rounded-full overflow-hidden bg-card-gradient shadow-lg flex items-center justify-center'>
                  <div className='text-8xl'>🤝</div>
                </div>

                {/* CTA Message */}
                <div className={`text-body-xl leading-relaxed whitespace-pre-line px-2`}>
                  {ctaMessage}
                </div>
              </div>
              {/* CTA Email Button */}
              <div className='mt-4'>
                <CTAEmailButton
                  className={`${itemsPerRow === '4' ? 'flex-wrap' : 'flex-wrap md:flex-nowrap'}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollabBlock;
