import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import type { IconBlock } from '@/types/blocks';

interface IconProps extends Omit<IconBlock, '_type' | '_key'> {
  className?: string;
  'data-sanity'?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Icon = ({ image, showIcon: _showIcon, className = '', ...rest }: IconProps) => {
  // showIcon is destructured to prevent it from being passed to DOM element
  const imgAlt = image?.asset ? image.alt || 'Icon image' : '07:17 Records Logo';
  const fallbackImage = '/images/logo-black-on-transparent.png';

  return (
    <div
      className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-brand-gradient flex items-center justify-center ${className}`.trim()}
      {...rest}>
      <UnifiedImage
        src={image?.asset ? image : null}
        alt={imgAlt}
        mode="fill"
        sizeContext="icon"
        objectFit="contain"
        sizes='40px'
        className={`${image?.asset ? 'p-3' : 'p-1'}`}
        fallback={
          <UnifiedImage
            src={fallbackImage}
            alt="07:17 Records Logo"
            mode="fill"
            sizeContext="icon"
            objectFit="contain"
            className="p-1"
          />
        }
      />
    </div>
  );
};

export default Icon;
