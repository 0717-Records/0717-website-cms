import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { IconBlock } from '@/types/blocks';

interface IconProps extends Omit<IconBlock, '_type' | '_key'> {
  className?: string;
  'data-sanity'?: string;
}

const Icon = ({ image, className = '', 'data-sanity': dataSanity }: IconProps) => {
  const imgSrc = image?.asset ? urlFor(image).url() : '/images/logo-black-on-transparent.png';
  const imgAlt = image?.asset ? image.alt || 'Icon image' : '07:17 Records Logo';

  return (
    <div
      className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-gradient flex items-center justify-center ${className}`.trim()}
      {...(dataSanity && { 'data-sanity': dataSanity })}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        sizes='40px'
        className={`object-contain ${image?.asset ? 'p-3' : 'p-1'}`}
      />
    </div>
  );
};

export default Icon;
