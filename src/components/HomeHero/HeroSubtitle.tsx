import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { getTextColorClasses } from './heroUtils';

interface HeroSubtitleProps {
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
}

const HeroSubtitle = ({ heroSubtitle, heroTextColor, enableFeaturedItems, documentId, documentType }: HeroSubtitleProps) => {
  if (!heroSubtitle) return null;

  // Smaller font sizes when featured items are enabled
  const subtitleClasses = enableFeaturedItems
    ? `text-body-base sm:text-body-lg ${getTextColorClasses(heroTextColor)}`
    : `text-body-lg sm:text-body-2xl ${getTextColorClasses(heroTextColor)}`;

  return (
    <div
      className={subtitleClasses}
      style={{ whiteSpace: 'pre-line' }}
      {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
      {typeof heroSubtitle === 'string'
        ? stegaClean(heroSubtitle)
        : 'Please update subtitle in Sanity Studio'}
    </div>
  );
};

export default HeroSubtitle;