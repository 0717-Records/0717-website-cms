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

  const embedWidth = widthAttrMatch?.[1] || widthStyleMatch?.[1];
  const embedHeight = heightAttrMatch?.[1] || heightStyleMatch?.[1];

  console.log({ embedUrl, embedWidth, embedHeight });

  if (!embedUrl) {
    return (
      <div className={`p-4 border border-red-200 rounded-lg bg-red-50`}>
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

  // Parse URL parameters to determine widget type
  const sizeMatch = embedUrl.match(/size=([^&/]+)(?:[&/]|$)/);
  const tracklistMatch = embedUrl.match(/tracklist=([^&/]+)(?:[&/]|$)/);
  const artworkMatch = embedUrl.match(/artwork=([^&/]+)(?:[&/]|$)/);
  const minimalMatch = embedUrl.match(/minimal=([^&/]+)(?:[&/]|$)/);

  const size = sizeMatch ? sizeMatch[1] : null;
  const tracklist = tracklistMatch ? tracklistMatch[1] : null;
  const artwork = artworkMatch ? artworkMatch[1] : null;
  const minimal = minimalMatch ? minimalMatch[1] : null;

  console.log({ size, tracklist, artwork, minimal });

  // Determine max width - use embedWidth if available, otherwise default to 700px
  const maxWidth = embedWidth ? parseInt(embedWidth) : 700;

  let className = 'w-full';

  // Determine which widget type based on URL parameters
  if (size === 'small') {
    // SLIM
    console.log('SLIM');
    className += ` max-w-[${maxWidth}px] h-[42px]`;
  } else if (minimal === 'true') {
    // ARTWORK ONLY
    console.log('ARTWORK ONLY');
    className += ` max-w-[${maxWidth}px] aspect-square`;
  } else if (artwork === 'none' && tracklist === 'false') {
    // Show artwork FALSE && Show tracklist FALSE
    console.log('Show artwork FALSE && Show tracklist FALSE');
    className += ` max-w-[${maxWidth}px] h-[120px]`;
  } else if (artwork === 'none' && tracklist !== 'false') {
    // Show artwork FALSE && Show tracklist TRUE
    console.log('Show artwork FALSE && Show tracklist TRUE');
    const height = embedHeight ? parseInt(embedHeight) : 406;
    className += ` max-w-[${maxWidth}px] h-[${height}px]`;
  } else if (artwork === 'small' && tracklist === 'false') {
    // Show artwork TRUE (SMALL) && Show tracklist FALSE
    console.log('Show artwork TRUE (SMALL) && Show tracklist FALSE');
    className += ` max-w-[${maxWidth}px] h-[120px]`;
  } else if (artwork === 'small' && tracklist !== 'false') {
    // Show artwork TRUE (SMALL) && Show tracklist TRUE
    console.log('Show artwork TRUE (SMALL) && Show tracklist TRUE');
    const height = embedHeight ? parseInt(embedHeight) : 406;
    className += ` max-w-[${maxWidth}px] h-[${height}px]`;
  } else if (tracklist === 'false') {
    // Show artwork TRUE (BIG) && Show tracklist FALSE
    console.log('Show artwork TRUE (BIG) && Show tracklist FALSE');
    const height = embedHeight ? parseInt(embedHeight) : 500;
    className += ` max-w-[${maxWidth}px] aspect-[calc(${maxWidth}/${height})]`;
  } else {
    // Show artwork TRUE (BIG) && Show tracklist TRUE
    console.log('Show artwork TRUE (BIG) && Show tracklist TRUE');
    const height = embedHeight ? parseInt(embedHeight) : 500;
    className += ` max-w-[${maxWidth}px] aspect-[calc(${maxWidth}/${height})]`;
  }

  return (
    <iframe
      {...widgetDataAttribute}
      className={className}
      src={embedUrl}
      title='Bandcamp Player'
      seamless
    />
  );
};

export default BandcampWidget;
