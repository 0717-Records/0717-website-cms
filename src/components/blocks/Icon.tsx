import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { stegaClean } from 'next-sanity';
import type { IconBlock } from '@/types/blocks';

interface IconProps extends Omit<IconBlock, '_type' | '_key'> {
  className?: string;
}

const Icon = ({ image, alignment, className = '' }: IconProps) => {
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

  if (!image?.asset) {
    return null;
  }

  return (
    <div className={`flex ${getAlignmentClass()} ${className}`.trim()}>
      <div className="relative w-[70px] h-[70px] rounded-full bg-brand-gradient flex items-center justify-center shadow-sm">
        <div className="relative w-10 h-10">
          <Image
            src={urlFor(image).width(80).height(80).url()}
            alt={image.alt || ''}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Icon;