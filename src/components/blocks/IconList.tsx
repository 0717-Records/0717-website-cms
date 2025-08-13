import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { IconListBlock } from '@/types/blocks';

interface IconListProps extends Omit<IconListBlock, '_type' | '_key'> {
  className?: string;
}

const IconList = ({ items = [], alignment = 'left', className = '' }: IconListProps) => {
  const getAlignmentClass = () => {
    switch (alignment) {
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
      <div className={`flex flex-wrap gap-4 md:gap-6 ${getAlignmentClass()}`}>
        {items.map((item) => (
          <div
            key={item._key}
            className='group flex items-center gap-3 px-4 py-3 rounded-full border border-brand-secondary/20 bg-brand-secondary/5 transition-all duration-300 hover:border-brand-secondary/40 hover:bg-brand-secondary/10 hover:shadow-md hover:-translate-y-0.5'>
            {item.icon && (
              <div className='relative w-6 h-6 flex-shrink-0'>
                <Image
                  src={urlFor(item.icon).width(24).height(24).url()}
                  alt={item.icon.alt || ''}
                  fill
                  className='object-contain'
                />
              </div>
            )}
            <span className='text-body-base font-medium text-gray-800 whitespace-nowrap'>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconList;
