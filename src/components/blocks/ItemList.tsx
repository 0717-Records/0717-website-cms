import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ItemListBlock } from '@/types/blocks';
import { getAlignmentClasses } from './shared/alignmentUtils';

interface ItemListProps extends Omit<ItemListBlock, '_type' | '_key'> {
  className?: string;
  inheritAlignment?: 'left' | 'center' | 'right';
}

const ItemList = ({ items = [], alignment, className = '', inheritAlignment }: ItemListProps) => {
  // Use the shared alignment utilities that properly handle inherit
  const alignmentClasses = getAlignmentClasses(alignment, inheritAlignment);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`.trim()}>
      <div
        className={`flex flex-wrap gap-4 md:gap-6 ${alignmentClasses}`}>
        {items.map((item) => (
          <div
            key={item._key}
            className='group flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-200'>
            {item.icon && item.icon.asset ? (
              <div className='relative w-6 h-6 flex-shrink-0'>
                <Image
                  src={urlFor(item.icon).width(72).height(72).url()}
                  alt={item.icon.alt || ''}
                  fill
                  sizes='24px'
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

export default ItemList;
