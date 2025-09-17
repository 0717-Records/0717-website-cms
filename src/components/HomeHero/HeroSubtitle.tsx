import React from 'react';
import { PortableText } from 'next-sanity';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { createHeroRichTextComponents } from './heroRichTextComponents';

interface HeroSubtitleProps {
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  documentId: string;
  documentType: string;
}

const HeroSubtitle = ({ heroSubtitle, documentId, documentType }: HeroSubtitleProps) => {
  if (!heroSubtitle || !Array.isArray(heroSubtitle)) return null;

  // Use Hero-specific Rich Text components with scale factor
  const components = createHeroRichTextComponents('center');

  return (
    <div
      className="
        prose prose-slate max-w-none
        /* Mobile: Allow content to scale and fit within available space */
        overflow-hidden
        /* Responsive text sizing - let Rich Text components handle scaling */
        text-center
      "
      {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
      <PortableText value={heroSubtitle} components={components} />
    </div>
  );
};

export default HeroSubtitle;