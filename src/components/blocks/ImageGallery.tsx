'use client';

import React, { useState } from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import type { ImageGalleryBlock } from '@/types/blocks';
import Modal from '@/components/UI/Modal';

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

  const currentImage = images[currentImageIndex];
  const currentImageUrl = currentImage?.image?.asset ? urlFor(currentImage.image).url() : '';
  const currentImageAlt = stegaClean(currentImage?.image?.alt) || `Image ${currentImageIndex + 1}`;
  const currentCaption = stegaClean(currentImage?.caption);

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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className='max-w-[95vw] max-h-[95vh]'
        aria-labelledby='gallery-modal-title'
        aria-describedby='gallery-modal-description'>
        <div
          className='flex flex-col items-center'
          onKeyDown={handleKeyNavigation}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          tabIndex={-1}>
          <h2 id='gallery-modal-title' className='sr-only'>
            Image gallery viewer
          </h2>
          <div id='gallery-modal-description' className='sr-only'>
            Image {currentImageIndex + 1} of {images.length}: {currentImageAlt}
          </div>

          {/* Navigation buttons */}
          <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-20'>
            <button
              onClick={handlePrevImage}
              className='p-3 bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors cursor-pointer'
              aria-label='Previous image'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
          </div>

          <div className='absolute right-4 top-1/2 transform -translate-y-1/2 z-20'>
            <button
              onClick={handleNextImage}
              className='p-3 bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors cursor-pointer'
              aria-label='Next image'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>

          {/* Main image */}
          <div className='relative'>
            {currentImageUrl && (
              <NextImage
                src={currentImageUrl}
                alt={currentImageAlt}
                width={1200}
                height={900}
                className='max-w-full max-h-[75vh] object-contain'
                priority
              />
            )}
          </div>

          {/* Image info */}
          <div className='mt-4 text-center text-white'>
            <div className='text-sm opacity-75 mb-2'>
              {currentImageIndex + 1} of {images.length}
            </div>
            {currentCaption && <p className='max-w-2xl px-4'>{currentCaption}</p>}
          </div>

          {/* Thumbnail navigation */}
          <div className='mt-4 flex gap-2 overflow-x-auto max-w-full px-4'>
            {images.map((item, idx) => {
              if (!item.image?.asset) return null;

              const thumbUrl = urlFor(item.image).width(100).height(75).url();
              const isActive = idx === currentImageIndex;

              return (
                <button
                  key={item._key || idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 ${
                    isActive ? 'ring-2 ring-white ring-opacity-75' : 'opacity-60 hover:opacity-80'
                  } transition-all rounded overflow-hidden`}
                  aria-label={`Go to image ${idx + 1}`}>
                  <NextImage
                    src={thumbUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    width={60}
                    height={45}
                    className='object-cover'
                  />
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageGallery;
