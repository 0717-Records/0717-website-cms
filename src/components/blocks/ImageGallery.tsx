'use client';

import React, { useState } from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import type { ImageGalleryBlock } from '@/types/blocks';
import ImageGalleryModal from '../Modals/ImageGalleryModal';

interface ImageGalleryProps extends ImageGalleryBlock {
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

const ImageGallery: React.FC<ImageGalleryProps> = ({
  columns = '3',
  images,
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const cleanColumns = stegaClean(columns) || '3';
  const validColumns = ['2', '3', '4'].includes(cleanColumns) ? cleanColumns : '3';

  const getGridClasses = (cols: string) => {
    switch (cols) {
      case '2':
        return 'w-full md:w-[calc(50%-16px)]';
      case '3':
        return 'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]';
      case '4':
        return 'w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]';
      default:
        return 'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]';
    }
  };

  const gridClasses = getGridClasses(validColumns);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleImageIndexChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleKeyNavigation = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  // Mobile touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
  };

  // Create data attribute for individual image caption if Sanity props are provided
  const getCaptionDataAttribute = (imageIndex: number) => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: `${pathPrefix}.images[${imageIndex}].caption`,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  return (
    <>
      <div className={`w-full flex justify-center flex-wrap gap-8 ${className}`}>
        {images.map((item, idx) => {
          if (!item.image?.asset) return null;

          const imageUrl = urlFor(item.image).url();
          const imageAlt = stegaClean(item.image.alt) || `Gallery image ${idx + 1}`;
          const caption = stegaClean(item.caption);

          return (
            <figure key={item._key || idx} className={gridClasses}>
              <div
                className='relative cursor-pointer'
                onClick={() => handleImageClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(idx);
                  }
                }}
                tabIndex={0}
                role='button'
                aria-label={`View gallery image ${idx + 1}: ${imageAlt}`}>
                <NextImage
                  src={imageUrl}
                  alt={imageAlt}
                  width={400}
                  height={300}
                  className='w-full h-64 object-cover rounded-lg'
                />
              </div>
              {caption && (
                <figcaption
                  className='mt-2 text-sm text-gray-600 text-center italic'
                  {...getCaptionDataAttribute(idx)}>
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={images}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={handleImageIndexChange}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyNavigation={handleKeyNavigation}
      />
    </>
  );
};

export default ImageGallery;
