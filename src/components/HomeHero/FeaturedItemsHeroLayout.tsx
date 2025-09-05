import React from 'react';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import FeaturedItems from './FeaturedItems';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroLogo from './HeroLogo';
import HeroCTA from './HeroCTA';
import { getTextColorClasses } from './heroUtils';
import styles from './styles.module.css';

interface FeaturedItemsHeroLayoutProps {
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  enableHeroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['enableHeroCallToAction'];
  heroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['heroCallToAction'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
  documentId: string;
  documentType: string;
}

// Featured items layout: 3-section vertical layout
const FeaturedItemsHeroLayout = (props: FeaturedItemsHeroLayoutProps) => {
  const {
    heroTextColor,
    heroTitle,
    heroSubtitle,
    enableFeaturedItems,
    showHeroLogo,
    enableHeroCallToAction,
    heroCallToAction,
    featuredImages,
    documentId,
    documentType,
  } = props;

  const componentProps = {
    heroTitle,
    heroSubtitle,
    heroTextColor,
    enableFeaturedItems,
    showHeroLogo,
    enableHeroCallToAction,
    heroCallToAction,
    documentId,
    documentType,
  };

  return (
    <div className={`relative ${styles['hero-height']} z-[25] flex flex-col justify-between py-8`}>
      {/* Top Section: Logo and Title */}
      <div
        className={`flex flex-col items-center text-center px-4 ${getTextColorClasses(heroTextColor)}`}>
        <HeroLogo {...componentProps} />
        <HeroTitle {...componentProps} />
      </div>

      {/* Center Section: Featured Images */}
      <div
        className='flex-1 flex border border-blue-500'
        {...createSanityDataAttribute(documentId, documentType, 'featuredImages')}>
        <FeaturedItems featuredImages={featuredImages} />
      </div>

      {/* Bottom Section: Subtitle and CTA */}
      <div
        className={`flex flex-col items-center text-center px-4 space-y-4 ${getTextColorClasses(heroTextColor)}`}>
        <HeroSubtitle {...componentProps} />
        <HeroCTA {...componentProps} />
      </div>
    </div>
  );
};

export default FeaturedItemsHeroLayout;