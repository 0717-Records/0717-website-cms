'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { urlFor } from '@/sanity/lib/image';
import type { SanityLiveEditingProps } from '../../utils/sectionHelpers';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import Heading from '../Typography/Heading/Heading';
import Modal from '../UI/Modal';

type GalleryImage = {
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
    };
    media?: unknown;
    hotspot?: unknown;
    crop?: unknown;
    alt?: string;
    _type: 'image';
  };
  caption?: string;
  _key: string;
};

interface ImageGalleryModalProps
  extends Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  isModalOpen: boolean;
  closeModal: () => void;
  images: GalleryImage[];
  initialIndex: number;
  pathPrefix?: string;
}

const ImageGalleryModal = ({
  isModalOpen,
  closeModal,
  images,
  initialIndex,
  documentId,
  documentType,
  pathPrefix,
}: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const currentImage = images?.[currentIndex];
  const totalImages = images?.length || 0;

  const navigateToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const navigateToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const navigateToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen || !images || images.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          navigateToPrevious();
          break;
        case 'ArrowRight':
          navigateToNext();
          break;
        case 'Escape':
          closeModal();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, images, navigateToPrevious, navigateToNext, closeModal]);

  // Auto-scroll thumbnails to keep current image visible
  useEffect(() => {
    if (thumbnailsRef.current && images && images.length > 0) {
      const thumbnailElement = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex, images]);

  if (!images || images.length === 0) return null;

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStart === null) return;

    const swipeEnd = e.changedTouches[0].clientX;
    const swipeDistance = swipeStart - swipeEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        navigateToNext();
      } else {
        navigateToPrevious();
      }
    }

    setSwipeStart(null);
  };

  // Image loading handlers
  const handleImageLoadStart = (index: number) => {
    setLoadingImages((prev) => new Set(prev).add(index));
  };

  const handleImageLoadComplete = (index: number) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  // Get image URL
  const getImageUrl = (image: GalleryImage['image']) => {
    return image?.asset ? urlFor(image).url() : '';
  };

  // Create data attribute for individual image caption
  const getCaptionDataAttribute = (imageIndex: number) => {
    return pathPrefix
      ? createSanityDataAttribute(
          documentId,
          documentType,
          `${pathPrefix}.images[${imageIndex}].caption`
        )
      : {};
  };

  const previousIndex = (currentIndex - 1 + totalImages) % totalImages;
  const nextIndex = (currentIndex + 1) % totalImages;
  const previousImage = images[previousIndex];
  const nextImage = images[nextIndex];

  return (
    <Modal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      aria-labelledby='image-modal-title'
      aria-describedby='image-modal-description'>
      <div className='w-full h-full flex flex-col justify-center relative z-10'>
        <Heading level='h2' id='gallery-modal-title' className='sr-only'>
          Image gallery viewer - Image {currentIndex + 1} of {totalImages}
        </Heading>
        <div id='gallery-modal-description' className='sr-only'>
          Navigate with arrow keys, swipe, or click thumbnails
        </div>

        {/* Main Carousel Section - Take available space minus thumbnail section */}
        <div className='flex flex-col flex-grow overflow-hidden border-4 border-red-500'>
          {/* Carousel Container */}
          <div
            className='flex justify-center flex-grow relative px-2 sm:px-4 h-full border-4 border-blue-500'
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            {/* Previous Arrow Button */}
            {totalImages > 1 && (
              <div className='flex items-center z-20 h-full'>
                <button
                  onClick={navigateToPrevious}
                  className='flex items-center justify-center w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full transition-colors group'
                  aria-label='Previous image'>
                  <FaChevronLeft className='text-white text-lg' />
                </button>
              </div>
            )}

            {/* Current Image - responsive with proper constraints */}
            <div
              className='flex justify-center items-center relative h-full border-2 border-green-500'
              style={{ maxWidth: '66.666667%' }}>
              {loadingImages.has(currentIndex) && (
                <div className='absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10'>
                  <FaSpinner className='text-gray-400 text-2xl animate-spin' />
                </div>
              )}
              <div className='border-4 border-yellow-300 h-full max-w-full'>
                <NextImage
                  src={getImageUrl(currentImage.image)}
                  alt={stegaClean(currentImage.image?.alt) || `Gallery image ${currentIndex + 1}`}
                  width={800}
                  height={600}
                  className='object-contain rounded-lg h-full w-auto max-w-full'
                  sizes='(max-width: 640px) calc(66vw - 8rem), (max-width: 1024px) calc(66vw - 10rem), calc(66vw - 12rem)'
                  priority
                  onLoadStart={() => handleImageLoadStart(currentIndex)}
                  onLoad={() => handleImageLoadComplete(currentIndex)}
                />
              </div>
            </div>

            {/* Next Arrow Button */}
            {totalImages > 1 && (
              <div className='flex items-center z-20 h-full'>
                <button
                  onClick={navigateToNext}
                  className='flex items-center justify-center w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full transition-colors group'
                  aria-label='Next image'>
                  <FaChevronRight className='text-white text-lg' />
                </button>
              </div>
            )}
          </div>

          {/* Image Caption */}
          {currentImage.caption && (
            <div className='flex-shrink-0 text-center py-2 px-4'>
              <p
                className='text-body-sm sm:text-body-base text-white italic max-w-2xl mx-auto'
                {...getCaptionDataAttribute(currentIndex)}>
                {stegaClean(currentImage.caption)}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail Section - Fixed height */}
        <div className='border border-orange-400'>
          <div className='h-full flex flex-col justify-center pt-4'>
            {/* Thumbnails */}
            {totalImages > 1 && (
              <div className='flex-1 flex items-center justify-center px-4'>
                <div
                  ref={thumbnailsRef}
                  className='flex gap-2 overflow-x-auto scrollbar-hide max-w-full'>
                  {images.map((image, index) => {
                    const isActive = index === currentIndex;
                    const imageUrl = getImageUrl(image.image);
                    const imageAlt =
                      stegaClean(image.image?.alt) || `Gallery thumbnail ${index + 1}`;

                    return (
                      <button
                        key={image._key || index}
                        onClick={() => navigateToIndex(index)}
                        className={`
                          relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-200
                          ${
                            isActive
                              ? 'border-2 border-brand-secondary opacity-100'
                              : 'opacity-70 hover:opacity-100 hover:scale-105'
                          }
                        `}
                        aria-label={`Go to image ${index + 1}`}>
                        {loadingImages.has(index) && (
                          <div className='absolute inset-0 flex items-center justify-center bg-gray-100 z-10'>
                            <FaSpinner className='text-gray-400 text-sm animate-spin' />
                          </div>
                        )}
                        <NextImage
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className='object-cover'
                          sizes='(max-width: 640px) 64px, (max-width: 768px) 80px, 96px'
                          onLoadStart={() => handleImageLoadStart(index)}
                          onLoad={() => handleImageLoadComplete(index)}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Image Counter */}
            <div className='text-center py-2'>
              <span className='text-body-sm text-white'>
                {currentIndex + 1} of {totalImages}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageGalleryModal;
