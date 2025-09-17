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
    <div
      className={`relative ${styles['hero-height']} flex flex-col justify-around items-center text-center px-8 z-[25]`}>
      {/* Top Section: Logo and Title */}
      <div
        className={`flex flex-col items-center text-center px-4 py-4 ${getTextColorClasses(heroTextColor)}`}>
        <HeroLogo {...componentProps} />
        <HeroTitle {...componentProps} />
      </div>

      {/* Center Section: Featured Images - can grow when wrapping */}
      <div
        className='w-full'
        {...createSanityDataAttribute(documentId, documentType, 'featuredImages')}>
        <FeaturedItems featuredImages={featuredImages} />
      </div>

      {/* Bottom Section: Subtitle and CTA */}
      <div
        className={`flex flex-col items-center text-center px-4 py-4 space-y-4 ${getTextColorClasses(heroTextColor)}`}>
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
