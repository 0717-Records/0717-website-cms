import React from 'react';
import { PortableText } from 'next-sanity';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { createHeroRichTextComponents } from './heroRichTextComponents';

interface HeroSubtitleProps {
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  documentId: string;
  documentType: string;
  textAlignment?: string;
}

const HeroSubtitle = ({ heroSubtitle, documentId, documentType, textAlignment = 'center' }: HeroSubtitleProps) => {
  if (!heroSubtitle || !Array.isArray(heroSubtitle)) return null;

  // Use Hero-specific Rich Text components with dynamic alignment
  const components = createHeroRichTextComponents(textAlignment);

  // Get responsive text alignment class based on the alignment prop
  const getTextAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'text-center md:text-left'; // center on mobile, left on desktop
      case 'right':
        return 'text-center md:text-right'; // center on mobile, right on desktop
      case 'center':
      default:
        return 'text-center';
    }
  };

  return (
    <div
      className={`
        prose prose-slate max-w-none
        /* Mobile: Allow content to scale and fit within available space */
        overflow-hidden
        /* Responsive text sizing - let Rich Text components handle scaling */
        ${getTextAlignmentClass(textAlignment)}
      `}
      {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
      <PortableText value={heroSubtitle} components={components} />
    </div>
  );
};

export default HeroSubtitle;