import React from 'react';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import HeroLogo from './HeroLogo';
import HeroCTA from './HeroCTA';
import { getTextColorClasses } from './heroUtils';

interface RegularHeroLayoutProps {
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  heroCallToActionList: NonNullable<HOME_PAGE_QUERYResult>['heroCallToActionList'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
  showLogoBackColor?: boolean;
}

// Regular positioned layout: absolute positioning with content position settings
const RegularHeroLayout = (props: RegularHeroLayoutProps) => {
  const {
    heroContentPosition,
    heroTextColor,
    heroTitle,
    heroSubtitle,
    enableFeaturedItems,
    showHeroLogo,
    heroCallToActionList,
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

  const heroSubtitleProps = {
    heroSubtitle,
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
      className={`
        absolute z-[25] ${getTextColorClasses(heroTextColor)}
        ${getPositionClasses(heroContentPosition || 'center-center')}

        /* Mobile: Full height centering with space for scroll arrow */
        h-full max-h-[calc(100vh-8rem)] sm:max-h-none
        flex flex-col justify-center

        /* Desktop: Use position classes as before */
        sm:h-auto sm:max-h-none sm:block
      `}
      {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>

      {/* Mobile: Vertically centered flex container */}
      <div className={`
        flex flex-col ${logoConfig.alignment} ${logoConfig.spacing}

        /* Mobile: Ensure content scales to fit screen */
        max-h-full overflow-hidden

        /* Desktop: Normal layout */
        sm:max-h-none sm:overflow-visible
      `}>
        {/* Logo with responsive scaling */}
        <div className="flex-shrink-1 min-h-0">
          <HeroLogo {...componentProps} />
        </div>

        {/* Main content with growth/shrink capabilities */}
        <div className={`
          relative z-10 flex flex-col ${logoConfig.alignment} ${logoConfig.spacing}

          /* Mobile: Allow content to grow/shrink as needed */
          flex-grow flex-shrink min-h-0

          /* Desktop: Normal behavior */
          sm:flex-grow-0 sm:flex-shrink-0 sm:min-h-auto
        `}>
          {/* Title with responsive scaling */}
          <div className="flex-shrink-0">
            <HeroTitle {...componentProps} />
          </div>

          {/* Subtitle that can grow/shrink for long content */}
          <div className="flex-grow flex-shrink min-h-0 overflow-hidden">
            <HeroSubtitle {...heroSubtitleProps} />
          </div>

          {/* CTA buttons - always visible */}
          <div className="flex-shrink-0 mt-2 sm:mt-0">
            <HeroCTA {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegularHeroLayout;
