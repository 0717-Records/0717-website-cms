import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { IconBlock } from '@/types/blocks';

interface IconProps extends Omit<IconBlock, '_type' | '_key'> {
  className?: string;
}

const Icon = ({ image, className = '' }: IconProps) => {
  const imgSrc = image?.asset
    ? urlFor(image).width(80).height(80).url()
    : '/images/logo-black-on-transparent.png';
  const imgAlt = image?.asset ? image.alt || 'Icon image' : '07:17 Records Logo';

  return (
    <div
      className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-gradient flex items-center justify-center ${className}`.trim()}>
      <Image src={imgSrc} alt={imgAlt} fill sizes='40px' className='object-contain p-1' />
    </div>
  );
};

export default Icon;
