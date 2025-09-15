'use client';

import React, { useState } from 'react';
import { stegaClean } from 'next-sanity';
import type { ImageGalleryBlock } from '@/types/blocks';
import type { SanityLiveEditingProps } from '../../utils/sectionHelpers';
import ImageGalleryModal from '../Modals/ImageGalleryModal';
import UnifiedImage from '../UI/UnifiedImage';

interface ImageGalleryProps
  extends ImageGalleryBlock,
    Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  className?: string;
  pathPrefix?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  columns = '3',
  images,
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!images || !Array.isArray(images)) {
    return null;
  }

  const cleanColumns = stegaClean(columns) || '3';
  const validColumns = ['2', '3', '4'].includes(cleanColumns) ? cleanColumns : '3';

  const getGridClasses = (cols: string) => {
    switch (cols) {
      case '2':
        return 'w-[calc(50%-16px)]';
      case '3':
        return 'w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]';
      case '4':
        return 'w-[calc(50%-16px)] lg:w-[calc(25%-24px)]';
      default:
        return 'w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]';
    }
  };

  const gridClasses = getGridClasses(validColumns);

  return (
    <>
      <div
        className={`w-full flex justify-center flex-wrap gap-x-3 gap-y-3 md:gap-x-8 md:gap-y-4 ${className}`}
        role='region'
        aria-label={`Image gallery with ${images.length} images`}>
        {images.map((item, idx) => {
          const hasImage = item.image?.asset;
          const imageAlt =
            hasImage && item.image
              ? stegaClean(item.image.alt) || `Gallery image ${idx + 1}`
              : `Gallery placeholder ${idx + 1}`;

          // Calculate the actual index in the filtered images array (only images with assets)
          const filteredImageIndex = images
            .slice(0, idx)
            .filter((item) => item.image?.asset).length;

          return (
            <figure key={item._key || idx} className={gridClasses}>
              {hasImage ? (
                <button
                  onClick={() => {
                    setSelectedImageIndex(filteredImageIndex);
                    setIsModalOpen(true);
                  }}
                  className='relative cursor-pointer transition hover:scale-102 aspect-[4/3] block w-full h-full'
                  tabIndex={0}
                  aria-label={`Open image ${idx + 1} of ${images.length} in modal: ${imageAlt}`}
                  aria-describedby={`gallery-image-${idx}`}>
                  <UnifiedImage
                    src={item.image}
                    alt={imageAlt}
                    mode="fill"
                    sizeContext="gallery"
                    objectFit="cover"
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    className='rounded-lg'
                  />
                </button>
              ) : (
                <div className='aspect-[4/3] flex items-center justify-center'>
                  <div className='text-gray-400 text-body-lg'>No image</div>
                </div>
              )}
            </figure>
          );
        })}
      </div>
      <ImageGalleryModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        images={images.filter((item) => item.image?.asset)}
        initialIndex={selectedImageIndex}
        documentId={documentId}
        documentType={documentType}
        pathPrefix={pathPrefix}
      />
    </>
  );
};

export default ImageGallery;
