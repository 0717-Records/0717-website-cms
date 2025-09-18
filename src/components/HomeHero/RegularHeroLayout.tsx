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

// Regular flexbox layout: content positioning with flexbox
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

  // Map content position to flexbox alignment classes
  const getFlexAlignment = (position: string) => {
    const cleanPosition = stegaClean(
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
        'center-center'
    );

    const [vertical, horizontal] = cleanPosition.split('-');

    const justifyClasses = {
      top: 'justify-start',
      center: 'justify-center',
      bottom: 'justify-end',
    };

    const alignClasses = {
      left: 'items-start text-left',
      center: 'items-center text-center',
      right: 'items-end text-right',
    };

    return {
      justify: justifyClasses[vertical as keyof typeof justifyClasses] || 'justify-center',
      align: alignClasses[horizontal as keyof typeof alignClasses] || 'items-center text-center',
    };
  };

  const flexConfig = getFlexAlignment(heroContentPosition || 'center-center');

  const cleanPosition = stegaClean(
    heroContentPosition?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
      'center-center'
  );
  const [, horizontal] = cleanPosition.split('-');

  // Determine container alignment based on horizontal position
  const containerAlignment =
    horizontal === 'left' ? 'items-start' : horizontal === 'right' ? 'items-end' : 'items-center';

  return (
    <div
      className={`
        w-full h-full flex flex-col ${flexConfig.justify} ${flexConfig.align}
        ${getTextColorClasses(heroTextColor)}
        px-4 sm:px-8 lg:px-12
      `}
      {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
      {/* Content container with consistent alignment */}
      <div className={`flex flex-col ${containerAlignment} gap-4 sm:gap-6 max-w-4xl w-full mt-10`}>
        {/* Logo - can shrink when needed */}
        <div className='flex-shrink min-h-0'>
          <HeroLogo {...componentProps} />
        </div>

        {/* Title - priority content */}
        <div className='flex-shrink-0'>
          <HeroTitle {...componentProps} />
        </div>

        {/* Subtitle - can grow/shrink as needed */}
        <div className='flex-shrink min-h-0'>
          <HeroSubtitle {...heroSubtitleProps} />
        </div>

        {/* CTA buttons - always visible, aligned with content */}
        <div className='flex-shrink-0'>
          <HeroCTA {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default RegularHeroLayout;
