'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ImageGalleryBlock } from '@/types/blocks';
import Modal from '@/components/UI/Modal';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageGalleryBlock['images'];
  currentImageIndex: number;
  onImageIndexChange: (index: number) => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onKeyNavigation: (event: React.KeyboardEvent) => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  onImageIndexChange,
  onPrevImage,
  onNextImage,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onKeyNavigation,
}) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const currentImage = images[currentImageIndex];
  const currentImageUrl = currentImage?.image?.asset ? urlFor(currentImage.image).url() : '';
  const currentImageAlt = stegaClean(currentImage?.image?.alt) || `Image ${currentImageIndex + 1}`;
  const currentCaption = stegaClean(currentImage?.caption);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='w-[95vw] h-[95svh] max-w-[95vw] max-h-[95svh]'
      aria-labelledby='gallery-modal-title'
      aria-describedby='gallery-modal-description'>
      <div
        className='flex flex-col items-center justify-center h-full max-h-[95svh] overflow-hidden'
        onKeyDown={onKeyNavigation}
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
            onClick={onPrevImage}
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
            onClick={onNextImage}
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
        <div className='relative flex items-center justify-center'>
          {currentImageUrl && (
            <NextImage
              src={currentImageUrl}
              alt={currentImageAlt}
              width={1200}
              height={900}
              className='max-w-[90vw] max-h-[60svh] w-auto h-auto object-contain'
              priority
            />
          )}
        </div>

        {/* Image info and thumbnails */}
        <div className='flex-shrink-0 w-full mt-4'>
          {/* Image info */}
          <div className='mt-2 text-center text-white'>
            <div className='text-body-sm opacity-75 mb-1'>
              {currentImageIndex + 1} of {images.length}
            </div>
            {currentCaption && (
              <p className='max-w-2xl px-4 text-body-sm line-clamp-2 mx-auto'>{currentCaption}</p>
            )}
          </div>

          {/* Thumbnail navigation */}
          <div className='mt-2 pb-4 flex gap-1 md:gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide justify-center'>
            {images.map((item, idx) => {
              if (!item.image?.asset) return null;

              const thumbUrl = urlFor(item.image).width(100).height(75).url();
              const isActive = idx === currentImageIndex;

              return (
                <button
                  key={item._key || idx}
                  onClick={() => onImageIndexChange(idx)}
                  className={`flex-shrink-0 ${
                    isActive ? 'ring-2 ring-white ring-opacity-75' : 'opacity-60 hover:opacity-80'
                  } transition-all rounded overflow-hidden`}
                  aria-label={`Go to image ${idx + 1}`}>
                  <NextImage
                    src={thumbUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    width={50}
                    height={40}
                    className='object-cover w-10 h-8 md:w-12 md:h-10'
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;