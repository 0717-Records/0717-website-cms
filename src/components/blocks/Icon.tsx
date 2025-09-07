import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { IconBlock } from '@/types/blocks';

interface IconProps extends Omit<IconBlock, '_type' | '_key'> {
  className?: string;
}

const Icon = ({ image, className = '' }: IconProps) => {
  if (!image?.asset) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center ${className}`.trim()}>
      <div className='relative w-[70px] h-[70px] rounded-full bg-brand-gradient flex items-center justify-center shadow-sm'>
        <div className='relative w-10 h-10'>
          <Image
            src={urlFor(image).width(80).height(80).url()}
            alt={image.alt || ''}
            fill
            sizes='40px'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Icon;
