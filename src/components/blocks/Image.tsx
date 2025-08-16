'use client';

import React, { useState } from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import type { ImageBlock } from '@/types/blocks';
import Modal from '@/components/UI/Modal';

interface ImageProps extends ImageBlock {
  className?: string;
  documentId?: string;
  documentType?: string;
  pathPrefix?: string;
}

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

const Image: React.FC<ImageProps> = ({ 
  image, 
  size = 'full', 
  caption, 
  className = '',
  documentId,
  documentType,
  pathPrefix
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
  const getCaptionDataAttribute = () => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: `${pathPrefix}.caption`,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  return (
    <>
      <figure className={`${sizeClasses} ${className}`}>
        <div 
          className="relative cursor-pointer"
          onClick={handleImageClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleImageClick();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View full-screen image: ${imageAlt}`}
        >
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
            style={{ objectFit: 'cover' }}
          />
        </div>
        {cleanCaption && (
          <figcaption 
            className="mt-2 text-sm text-gray-600 text-center italic"
            {...getCaptionDataAttribute()}
          >
            {cleanCaption}
          </figcaption>
        )}
      </figure>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="max-w-[95vw] max-h-[95vh]"
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <div className="flex flex-col items-center">
          <h2 id="image-modal-title" className="sr-only">
            Full-screen image view
          </h2>
          <div id="image-modal-description" className="sr-only">
            {imageAlt}
          </div>
          <NextImage
            src={imageUrl}
            alt={imageAlt}
            width={1200}
            height={900}
            className="max-w-full max-h-[85vh] object-contain"
            priority
          />
          {cleanCaption && (
            <p className="mt-4 text-white text-center max-w-2xl px-4">
              {cleanCaption}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Image;