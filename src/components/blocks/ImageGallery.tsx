import React from 'react';
import { stegaClean } from 'next-sanity';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { ImageGalleryBlock } from '@/types/blocks';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';
import Modal from '../UI/Modal';

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
  if (!images || !Array.isArray(images) || images.length === 0) {
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

  // Create data attribute for individual image caption if Sanity props are provided
  const getCaptionDataAttribute = (imageIndex: number) => {
    return pathPrefix
      ? createSanityDataAttribute(
          documentId,
          documentType,
          `${pathPrefix}.images[${imageIndex}].caption`
        )
      : {};
  };

  return (
    <>
      <div
        className={`w-full flex justify-center flex-wrap gap-x-3 gap-y-3 md:gap-x-8 md:gap-y-4 ${className}`}>
        {images.map((item, idx) => {
          if (!item.image?.asset) return null;

          const imageUrl = urlFor(item.image).url();
          const imageAlt = stegaClean(item.image.alt) || `Gallery image ${idx + 1}`;
          const caption = stegaClean(item.caption);

          return (
            <figure key={item._key || idx} className={gridClasses}>
              <button
                className='relative aspect-[16/9] block w-full h-full'
                tabIndex={0}
                aria-label={`View gallery image ${idx + 1}: ${imageAlt}`}>
                <NextImage
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  className='object-cover rounded-lg'
                />
              </button>
              {caption && (
                <figcaption
                  className='mt-2 text-body-sm text-gray-600 text-center italic'
                  {...getCaptionDataAttribute(idx)}>
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </>
  );
};

export default ImageGallery;
