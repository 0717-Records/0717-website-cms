import React from 'react';
import UnifiedImage from '../UI/UnifiedImage';

interface EventImageProps {
  image?: string | null;
  title: string;
  isPast: boolean;
  pastEventText?: string | null;
  sizes: string;
  fallbackIconSize?: string;
}

const EventImage = ({
  image,
  title,
  // isPast and pastEventText kept for API compatibility but no longer used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPast,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pastEventText,
  sizes,
  fallbackIconSize = 'text-body-3xl'
}: EventImageProps) => {
  if (image) {
    return (
      <UnifiedImage
        src={image}
        alt={`${title} event poster`}
        mode="fill"
        sizeContext="card"
        objectFit="cover"
        sizes={sizes}
        generateSchema
        schemaContext="article"
        priority
      />
    );
  }

  return (
    <div className='w-full h-full relative'>
      <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900'>
        <div className='text-center text-white/70'>
          <div className={`${fallbackIconSize} mb-1`}>🎭</div>
        </div>
      </div>
    </div>
  );
};

export default EventImage;