import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { getTextColorClasses } from './heroUtils';

interface HeroFeaturedItemsSubtitleProps {
  heroFeaturedItemsSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroFeaturedItemsSubtitle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  documentId: string;
  documentType: string;
}

const HeroFeaturedItemsSubtitle = ({
  heroFeaturedItemsSubtitle,
  heroTextColor,
  documentId,
  documentType
}: HeroFeaturedItemsSubtitleProps) => {
  if (!heroFeaturedItemsSubtitle) return null;

  // Apply the original styling for featured items subtitle
  const subtitleClasses = `text-body-base sm:text-body-lg ${getTextColorClasses(heroTextColor)}`;

  return (
    <div
      className={subtitleClasses}
      style={{ whiteSpace: 'pre-line' }}
      {...createSanityDataAttribute(documentId, documentType, 'heroFeaturedItemsSubtitle')}>
      {stegaClean(heroFeaturedItemsSubtitle)}
    </div>
  );
};

export default HeroFeaturedItemsSubtitle;