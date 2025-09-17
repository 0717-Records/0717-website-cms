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

  // Smaller font sizes when featured items are enabled
  const titleClasses = enableFeaturedItems
    ? `text-h6 sm:text-h5 font-bold ${getTextColorClasses(heroTextColor)}`
    : `text-h1 font-bold ${getTextColorClasses(heroTextColor)}`;

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
