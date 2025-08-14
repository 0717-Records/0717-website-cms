import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import type { IconListBlock } from '@/types/blocks';

interface IconListProps extends Omit<IconListBlock, '_type' | '_key'> {
  className?: string;
}

const IconList = ({ items = [], alignment, className = '' }: IconListProps) => {
  // Clean the alignment value to remove Sanity's stega encoding characters
  const cleanAlignment = stegaClean(alignment);

  // Ensure we always have a valid alignment value, fallback to 'center'
  const validAlignment =
    cleanAlignment && ['left', 'center', 'right'].includes(cleanAlignment)
      ? cleanAlignment
      : 'center';

  const getAlignmentClass = () => {
    switch (validAlignment) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`py-8 ${className}`.trim()}>
      <div
        className={`flex flex-wrap gap-4 md:gap-6 ${getAlignmentClass()}`}
        data-alignment={validAlignment}>
        {items.map((item) => (
          <div
            key={item._key}
            className='group flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-200'>
            {item.icon && item.icon.asset ? (
              <div className='relative w-6 h-6 flex-shrink-0'>
                <Image
                  src={urlFor(item.icon).width(24).height(24).url()}
                  alt={item.icon.alt || ''}
                  fill
                  className='object-contain'
                />
              </div>
            ) : item.icon && !item.icon.asset ? (
              <div className='w-6 h-6 flex-shrink-0 bg-gray-100 border border-gray-200 rounded flex items-center justify-center'>
                <div className='w-3 h-3 bg-gray-300 rounded animate-pulse'></div>
              </div>
            ) : null}
            <span className='text-body-lg font-medium text-gray-800 whitespace-nowrap'>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
