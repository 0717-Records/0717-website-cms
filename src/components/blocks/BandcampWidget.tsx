'use client';

import React from 'react';
import { stegaClean } from 'next-sanity';
import type { BandcampWidget as BandcampWidgetType } from '@/sanity/types';
import { createSanityDataAttribute, type SanityLiveEditingProps } from '../../utils/sectionHelpers';

interface BandcampWidgetProps
  extends BandcampWidgetType,
    Omit<SanityLiveEditingProps, 'titlePath' | 'subtitlePath'> {
  className?: string;
  pathPrefix?: string;
}

const BandcampWidget: React.FC<BandcampWidgetProps> = ({
  embedCode,
  className = '',
  documentId,
  documentType,
  pathPrefix,
}) => {
  const cleanEmbedCode = stegaClean(embedCode);

  if (!cleanEmbedCode) {
    return null;
  }

  // Extract iframe src and dimensions from embed code
  const iframeSrcMatch = cleanEmbedCode.match(/src="([^"]+)"/);
  const embedUrl = iframeSrcMatch ? iframeSrcMatch[1] : null;

  // Extract width and height from either attributes or inline styles
  const widthAttrMatch = cleanEmbedCode.match(/width="(\d+)"/);
  const heightAttrMatch = cleanEmbedCode.match(/height="(\d+)"/);
  const widthStyleMatch = cleanEmbedCode.match(/width:\s*(\d+)px/);
  const heightStyleMatch = cleanEmbedCode.match(/height:\s*(\d+)px/);

  const embedWidth = widthAttrMatch?.[1] || widthStyleMatch?.[1] || '350';
  const embedHeight = heightAttrMatch?.[1] || heightStyleMatch?.[1] || '470';

  if (!embedUrl) {
    return (
      <div className={`${className} p-4 border border-red-200 rounded-lg bg-red-50`}>
        <p className='text-red-600'>
          Invalid Bandcamp embed code provided. Please paste the complete iframe embed code from
          Bandcamp.
        </p>
      </div>
    );
  }

  // Create data attribute for the widget container if Sanity props are provided
  const widgetDataAttribute = pathPrefix
    ? createSanityDataAttribute(documentId, documentType, pathPrefix)
    : {};

  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        width: '100%',
        maxWidth: `${embedWidth}px`,
      }}
      {...widgetDataAttribute}>
      <iframe
        src={embedUrl}
        width={embedWidth}
        height={embedHeight}
        className='w-full rounded-lg border-0'
        style={{
          width: '100%',
          height: `${embedHeight}px`,
        }}
        allowFullScreen
        allow='autoplay; fullscreen'
        loading='lazy'
        title='Bandcamp Player'
      />
    </div>
  );
};

export default BandcampWidget;
