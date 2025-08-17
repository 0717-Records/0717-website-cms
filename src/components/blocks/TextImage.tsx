'use client';

import React, { useState } from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { TextImageBlock } from '@/types/blocks';
import ImageModal from '../Modals/ImageModal';

interface TextImageProps extends TextImageBlock {
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

const TextImage: React.FC<TextImageProps> = ({
  content,
  image,
  layout = 'text-left',
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Don't render if either content or image is missing
  if (!content || !image?.asset) {
    return null;
  }

  const cleanLayout = stegaClean(layout) || 'text-left';
  const imageUrl = urlFor(image).url();
  const imageAlt = stegaClean(image.alt) || 'Image';

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Create data attributes for Sanity Live Editing
  const getContentDataAttribute = () => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: `${pathPrefix}.content`,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  const getImageDataAttribute = () => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: `${pathPrefix}.image`,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  // Layout classes based on the selected layout
  const getLayoutClasses = () => {
    const baseClasses = 'flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12';
    
    if (cleanLayout === 'text-right') {
      // Image on left, text on right on desktop
      // Image on top, text on bottom on mobile
      return {
        container: `${baseClasses} lg:flex-row`,
        textOrder: 'order-2 lg:order-2',
        imageOrder: 'order-1 lg:order-1',
      };
    } else {
      // Text on left, image on right on desktop (default)
      // Text on top, image on bottom on mobile
      return {
        container: `${baseClasses} lg:flex-row`,
        textOrder: 'order-1 lg:order-1',
        imageOrder: 'order-2 lg:order-2',
      };
    }
  };

  const layoutClasses = getLayoutClasses();

  return (
    <>
      <div className={`${layoutClasses.container} ${className}`.trim()}>
        {/* Text Content */}
        <div className={`w-full lg:w-1/2 ${layoutClasses.textOrder}`} {...getContentDataAttribute()}>
          <div className="prose prose-slate max-w-none">
            <PortableText value={content} components={components} />
          </div>
        </div>

        {/* Image */}
        <div className={`w-full lg:w-1/2 ${layoutClasses.imageOrder}`} {...getImageDataAttribute()}>
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
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    </>
  );
};

export default TextImage;