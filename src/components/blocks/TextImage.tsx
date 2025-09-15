'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { TextImageBlock } from '@/types/blocks';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';
import UnifiedImage from '../UI/UnifiedImage';

interface TextImageProps
  extends TextImageBlock,
    Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
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
  // Don't render if content is missing
  if (!content) {
    return null;
  }

  const cleanLayout = stegaClean(layout) || 'text-left';

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
          <div className='prose prose-slate max-w-none text-text-subtle'>
            <PortableText value={content} components={components} />
          </div>
        </div>

        {/* Image */}
        <div className={`w-full lg:w-1/2 ${layoutClasses.imageOrder}`} {...imageDataAttribute}>
          <UnifiedImage
            src={image}
            alt={image?.alt ? stegaClean(image.alt) : 'Text content image'}
            mode="sized"
            width={600}
            height={400}
            sizeContext="card"
            objectFit="cover"
            enableModal
            className='w-full h-auto rounded-lg'
            documentId={documentId}
            documentType={documentType}
            fieldPath={pathPrefix ? `${pathPrefix}.image` : 'image'}
          />
        </div>
      </div>
    </>
  );
};

export default TextImage;
