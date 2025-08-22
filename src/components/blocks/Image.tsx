'use client';

import React, { useState } from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ImageBlock } from '@/types/blocks';
import ImageModal from '../Modals/ImageModal';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';

interface ImageProps extends ImageBlock, Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  className?: string;
  pathPrefix?: string;
}


const Image: React.FC<ImageProps> = ({
  image,
  size = 'full',
  caption,
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!image?.asset) {
    return null;
  }

  const cleanSize = stegaClean(size) || 'full';
  const cleanCaption = stegaClean(caption);

  const imageUrl = urlFor(image).url();
  const imageAlt = stegaClean(image.alt) || 'Image';

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-full md:w-1/2 mx-auto';
      case 'full':
      default:
        return 'w-full';
    }
  };

  const sizeClasses = getSizeClasses(cleanSize);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Create data attribute for caption if Sanity props are provided
  const captionDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, `${pathPrefix}.caption`)
    : {};

  return (
    <>
      <figure className={`${sizeClasses} ${className}`}>
        <div
          className='relative cursor-pointer'
          onClick={handleImageClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleImageClick();
            }
          }}
          tabIndex={0}
          role='button'
          aria-label={`View full-screen image: ${imageAlt}`}>
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            width={800}
            height={600}
            className='w-full h-auto rounded-lg'
            style={{ objectFit: 'cover' }}
          />
        </div>
        {cleanCaption && (
          <figcaption
            className='mt-2 text-body-sm text-gray-600 text-center italic'
            {...captionDataAttribute}>
            {cleanCaption}
          </figcaption>
        )}
      </figure>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        caption={cleanCaption}
      />
    </>
  );
};

export default Image;
