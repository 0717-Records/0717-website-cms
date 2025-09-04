import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import FeaturedItems from './FeaturedItems';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroLogo from './HeroLogo';
import HeroCTA from './HeroCTA';
import { getTextColorClasses } from './heroUtils';
import styles from './styles.module.css';

interface HeroContentProps {
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  enableHeroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['enableHeroCallToAction'];
  heroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['heroCallToAction'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
  documentId: string;
  documentType: string;
}

const HeroContent = (props: HeroContentProps) => {
  const { enableFeaturedItems } = props;

  if (enableFeaturedItems) {
    return <FeaturedItemsLayout {...props} />;
  }

  return <RegularPositionedLayout {...props} />;
};

// Featured items layout: 3-section vertical layout
const FeaturedItemsLayout = (props: HeroContentProps) => {
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

// Regular positioned layout: absolute positioning with content position settings
const RegularPositionedLayout = (props: HeroContentProps) => {
  const {
    heroContentPosition,
    heroTextColor,
    heroTitle,
    heroSubtitle,
    enableFeaturedItems,
    showHeroLogo,
    enableHeroCallToAction,
    heroCallToAction,
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

  // Map content position to Tailwind classes
  const getPositionClasses = (position: string) => {
    const cleanPosition = stegaClean(
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
        'center-center'
    );

    const mobileBase = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center px-4 py-4';
    const mobileCenterClasses = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center';

    const desktopVariants = {
      left: 'md:left-10 lg:left-20 md:right-auto md:text-left md:transform-none md:translate-x-0 md:w-auto md:px-0',
      center:
        'md:left-1/2 md:right-auto md:text-center md:transform md:-translate-x-1/2 md:w-[85%] md:px-0',
      right:
        'md:right-10 lg:right-20 md:left-auto md:text-right md:transform-none md:translate-x-0 md:w-auto md:px-0',
    };

    const positionMap: Record<string, string> = {
      'top-left': `top-4 ${mobileBase} md:top-10 ${desktopVariants.left}`,
      'top-center': `top-4 ${mobileCenterClasses} md:top-10 ${desktopVariants.center}`,
      'top-right': `top-4 ${mobileBase} md:top-10 ${desktopVariants.right}`,
      'center-left': `top-1/2 ${mobileBase} -translate-y-1/2 md:left-10 lg:left-20 md:right-auto md:text-left md:translate-x-0 md:w-auto md:px-0`,
      'center-center': `top-1/2 ${mobileCenterClasses} -translate-y-1/2 md:left-1/2 md:right-auto md:text-center md:-translate-x-1/2 md:-translate-y-1/2 md:w-[85%] md:px-0`,
      'center-right': `top-1/2 ${mobileBase} -translate-y-1/2 md:right-10 lg:right-20 md:left-auto md:text-right md:translate-x-0 md:w-auto md:px-0`,
      'bottom-left': `bottom-4 ${mobileBase} md:bottom-10 ${desktopVariants.left}`,
      'bottom-center': `bottom-4 ${mobileCenterClasses} md:bottom-10 ${desktopVariants.center}`,
      'bottom-right': `bottom-4 ${mobileBase} md:bottom-10 ${desktopVariants.right}`,
    };

    return positionMap[cleanPosition] || positionMap['center-center'];
  };

  const getLogoAlignment = (position: string) => {
    const cleanPosition = stegaClean(
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
        'center-center'
    );
    const [vertical, horizontal] = cleanPosition.split('-');
    const isCenter = vertical === 'center';

    return {
      spacing: isCenter ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8',
      alignment:
        horizontal === 'left'
          ? 'items-center md:items-start'
          : horizontal === 'right'
            ? 'items-center md:items-end'
            : 'items-center',
    };
  };

  const logoConfig = getLogoAlignment(heroContentPosition || 'center-center');

  return (
    <div
      className={`absolute z-[25] ${getTextColorClasses(heroTextColor)} ${getPositionClasses(heroContentPosition || 'center-center')}`}
      {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
      <div className={`flex flex-col ${logoConfig.alignment} ${logoConfig.spacing} space-y-4`}>
        <HeroLogo {...componentProps} />
        <HeroTitle {...componentProps} />
        <HeroSubtitle {...componentProps} />
        <HeroCTA {...componentProps} />
      </div>
    </div>
  );
};

export default HeroContent;
