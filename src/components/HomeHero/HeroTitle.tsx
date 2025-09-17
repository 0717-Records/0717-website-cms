import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import Heading from '../Typography/Heading/Heading';
import { getTextColorClasses } from './heroUtils';

interface HeroTitleProps {
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
}

const HeroTitle = ({
  heroTitle,
  heroTextColor,
  enableFeaturedItems,
  documentId,
  documentType,
}: HeroTitleProps) => {
  if (!heroTitle) return null;

  // Enhanced responsive title sizing
  const titleClasses = enableFeaturedItems
    ? `text-h6 sm:text-h5 font-bold ${getTextColorClasses(heroTextColor)}`
    : `
        /* Mobile: Start smaller and scale up, allowing for shrinking when needed */
        text-h5 min-[380px]:text-h4 min-[480px]:text-h3 sm:text-h2 md:text-h1
        /* Allow text to scale down if content is too long */
        leading-tight sm:leading-normal
        font-bold ${getTextColorClasses(heroTextColor)}
      `.trim();

  return (
    <Heading
      level='h1'
      showMargin={false}
      className={titleClasses}
      {...createSanityDataAttribute(documentId, documentType, 'heroTitle')}>
      {stegaClean(heroTitle)}
    </Heading>
  );
};

export default HeroTitle;
