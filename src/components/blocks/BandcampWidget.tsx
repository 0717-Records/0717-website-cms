'use client';

import React from 'react';
import { stegaClean, createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { BandcampWidget as BandcampWidgetType } from '@/sanity/types';

interface BandcampWidgetProps extends BandcampWidgetType {
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
        <p className="text-red-600">Invalid Bandcamp embed code provided. Please paste the complete iframe embed code from Bandcamp.</p>
      </div>
    );
  }
  

  // Create data attribute for the widget container if Sanity props are provided
  const getWidgetDataAttribute = () => {
    if (!documentId || !documentType || !pathPrefix) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: pathPrefix,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  return (
    <div 
      className={`flex justify-center ${className}`}
      {...getWidgetDataAttribute()}
    >
      <iframe
        src={embedUrl}
        width={embedWidth}
        height={embedHeight}
        className="rounded-lg border-0"
        style={{ 
          width: `${embedWidth}px`,
          height: `${embedHeight}px`
        }}
        allowFullScreen
        allow="autoplay; fullscreen"
        loading="lazy"
        title="Bandcamp Player"
      />
    </div>
  );
};

export default BandcampWidget;