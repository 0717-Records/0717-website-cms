import React from 'react';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import FeaturedItems from './FeaturedItems';
import HeroTitle from './HeroTitle';
import HeroFeaturedItemsSubtitle from './HeroFeaturedItemsSubtitle';
import HeroLogo from './HeroLogo';
import HeroCTA from './HeroCTA';
import { getTextColorClasses } from './heroUtils';
import styles from './styles.module.css';

interface FeaturedItemsHeroLayoutProps {
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroFeaturedItemsSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroFeaturedItemsSubtitle'];
  heroCallToActionList: NonNullable<HOME_PAGE_QUERYResult>['heroCallToActionList'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
  documentId: string;
  documentType: string;
  showLogoBackColor?: boolean;
}

// Featured items layout: 3-section vertical layout
const FeaturedItemsHeroLayout = (props: FeaturedItemsHeroLayoutProps) => {
  const {
    heroTextColor,
    heroTitle,
    heroFeaturedItemsSubtitle,
    enableFeaturedItems,
    showHeroLogo,
    heroCallToActionList,
    featuredImages,
    documentId,
    documentType,
    showLogoBackColor,
  } = props;

  const componentProps = {
    heroTitle,
    heroTextColor,
    enableFeaturedItems,
    showHeroLogo,
    heroCallToActionList,
    documentId,
    documentType,
    showLogoBackColor,
  };

  return (
    <div className={`w-full h-full flex flex-col justify-between items-center text-center px-4 sm:px-8 ${getTextColorClasses(heroTextColor)}`}>
      {/* Top Section: Logo and Title - can shrink */}
      <div className="flex flex-col items-center text-center gap-4 sm:gap-6 flex-shrink min-h-0">
        <div className="flex-shrink min-h-0">
          <HeroLogo {...componentProps} />
        </div>
        <div className="flex-shrink-0">
          <HeroTitle {...componentProps} />
        </div>
      </div>

      {/* Center Section: Featured Images - grows to fill space */}
      <div
        className='w-full flex-1 flex items-center justify-center py-4'
        {...createSanityDataAttribute(documentId, documentType, 'featuredImages')}>
        <FeaturedItems featuredImages={featuredImages} />
      </div>

      {/* Bottom Section: Subtitle and CTA - fixed height */}
      <div className="flex flex-col items-center text-center gap-4 flex-shrink-0">
        <HeroFeaturedItemsSubtitle
          heroFeaturedItemsSubtitle={heroFeaturedItemsSubtitle}
          heroTextColor={heroTextColor}
          documentId={documentId}
          documentType={documentType}
        />
        <HeroCTA {...componentProps} />
      </div>
    </div>
  );
};

export default FeaturedItemsHeroLayout;
