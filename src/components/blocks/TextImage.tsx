'use client';

import React, { useState } from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { TextImageBlock } from '@/types/blocks';
import ImageModal from '../Modals/ImageModal';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';
import ImgPlaceHolder from '../UI/ImgPlaceHolder';

interface TextImageProps extends TextImageBlock, Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  className?: string;
  pathPrefix?: string;
}


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

  // Don't render if content is missing
  if (!content) {
    return null;
  }

  const cleanLayout = stegaClean(layout) || 'text-left';
  const hasImage = image?.asset;
  const imageUrl = hasImage ? urlFor(image).url() : null;
  const imageAlt = hasImage ? stegaClean(image.alt) || 'Image' : 'No image available';

  const handleImageClick = () => {
    if (hasImage) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Create data attributes for Sanity live editing
  const contentDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, `${pathPrefix}.content`)
    : {};
  const imageDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, `${pathPrefix}.image`)
    : {};


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
        <div className={`w-full lg:w-1/2 ${layoutClasses.textOrder}`} {...contentDataAttribute}>
          <div className="prose prose-slate max-w-none">
            <PortableText value={content} components={components} />
          </div>
        </div>

        {/* Image */}
        <div className={`w-full lg:w-1/2 ${layoutClasses.imageOrder}`} {...imageDataAttribute}>
          {hasImage ? (
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
                src={imageUrl!}
                alt={imageAlt}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            <ImgPlaceHolder />
          )}
        </div>
      </div>

      {hasImage && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={handleCloseModal}
          imageUrl={imageUrl!}
          imageAlt={imageAlt}
        />
      )}
    </>
  );
};

export default TextImage;