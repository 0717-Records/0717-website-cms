import React from 'react';
import Image from 'next/image';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import EmbeddedCTAButton from '../blocks/EmbeddedCTAButton';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import Heading from '../Typography/Heading/Heading';
import FeaturedItems from './FeaturedItems';

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

const HeroContent = ({
  heroTextColor,
  showHeroLogo,
  heroTitle,
  heroSubtitle,
  enableHeroCallToAction,
  heroCallToAction,
  heroContentPosition,
  enableFeaturedItems,
  featuredImages,
  documentId,
  documentType,
}: HeroContentProps) => {
  // Determine text color classes
  const getTextColorClasses = () => {
    const textColor = stegaClean(heroTextColor) || 'black';
    return textColor === 'white' ? 'text-white' : 'text-black';
  };

  // Map content position to Tailwind classes
  const getPositionClasses = (position: string) => {
    // Clean the position string to remove any invisible Unicode characters and stega
    const cleanPosition = stegaClean(
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
        'center-center'
    );

    // Base mobile classes - always centered with consistent spacing
    const mobileBase = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center px-4 py-4';
    const mobileCenterClasses = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center';

    // Desktop positioning variants
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

  // Get logo positioning and sizing based on content position and featured items
  const getLogoConfig = (position: string) => {
    const cleanPosition = stegaClean(
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
        'center-center'
    );
    const [vertical, horizontal] = cleanPosition.split('-');

    const isCenter = vertical === 'center';
    const isFeaturedItemsEnabled = enableFeaturedItems;

    return {
      order: 1, // Logo always above content
      size: isFeaturedItemsEnabled ? 'w-24 md:w-28 lg:w-32' : 'w-48 md:w-56 lg:w-64', // 50% smaller when featured items enabled
      spacing: isCenter ? 'gap-4 md:gap-6' : 'gap-6 md:gap-8',
      // Mobile-first alignment: always center on mobile, respect desktop positioning
      alignment:
        horizontal === 'left'
          ? 'items-center md:items-start'
          : horizontal === 'right'
            ? 'items-center md:items-end'
            : 'items-center',
    };
  };

  const renderCTA = () => {
    // First check if CTA is enabled
    if (!enableHeroCallToAction) return null;

    // If CTA is enabled but no heroCallToAction object, return null
    if (!heroCallToAction) return null;

    // Use EmbeddedCTAButton component
    return <EmbeddedCTAButton {...heroCallToAction} />;
  };

  const shouldShowLogo = showHeroLogo !== false; // Show by default if not specified
  const logoConfig = getLogoConfig(heroContentPosition || 'center-center');

  // Featured items layout: logo/title top, images center, subtitle/CTA bottom
  if (enableFeaturedItems) {
    return (
      <div className="absolute inset-0 z-[25] flex flex-col justify-between h-full">
        {/* Top Section: Logo and Title */}
        <div className={`flex flex-col items-center text-center pt-8 px-4 ${getTextColorClasses()}`}>
          {shouldShowLogo && (
            <div
              className="flex justify-center mb-4"
              {...createSanityDataAttribute(documentId, documentType, 'showHeroLogo')}>
              <Image
                src={
                  stegaClean(heroTextColor) === 'white'
                    ? '/images/logo-white-on-transparent.png'
                    : '/images/logo-black-on-transparent.png'
                }
                alt="07:17 Records Logo"
                width={500}
                height={500}
                className={`${logoConfig.size} h-auto object-contain`}
              />
            </div>
          )}
          {heroTitle && (
            <Heading
              level="h1"
              className={`text-h3 sm:text-h1 font-bold ${getTextColorClasses()}`}
              {...createSanityDataAttribute(documentId, documentType, 'heroTitle')}>
              {stegaClean(heroTitle)}
            </Heading>
          )}
        </div>

        {/* Center Section: Featured Images */}
        <div 
          className="flex-1 flex items-center justify-center px-4"
          {...createSanityDataAttribute(documentId, documentType, 'featuredImages')}>
          <FeaturedItems featuredImages={featuredImages} />
        </div>

        {/* Bottom Section: Subtitle and CTA */}
        <div className={`flex flex-col items-center text-center pb-8 px-4 space-y-4 ${getTextColorClasses()}`}>
          {heroSubtitle && (
            <div
              className={`text-body-lg sm:text-body-2xl ${getTextColorClasses()}`}
              style={{ whiteSpace: 'pre-line' }}
              {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
              {typeof heroSubtitle === 'string'
                ? stegaClean(heroSubtitle)
                : 'Please update subtitle in Sanity Studio'}
            </div>
          )}
          <div {...createSanityDataAttribute(documentId, documentType, 'heroCallToAction')}>
            {renderCTA()}
          </div>
        </div>
      </div>
    );
  }

  // Regular positioning layout (existing behavior)
  const LogoComponent = shouldShowLogo ? (
    <div
      className="flex justify-center"
      {...createSanityDataAttribute(documentId, documentType, 'showHeroLogo')}>
      <Image
        src={
          stegaClean(heroTextColor) === 'white'
            ? '/images/logo-white-on-transparent.png'
            : '/images/logo-black-on-transparent.png'
        }
        alt="07:17 Records Logo"
        width={500}
        height={500}
        className={`${logoConfig.size} h-auto object-contain`}
      />
    </div>
  ) : null;

  const ContentComponent = (
    <div className="space-y-4">
      {heroTitle && (
        <Heading
          level="h1"
          className={`text-h3 sm:text-h1 font-bold ${getTextColorClasses()}`}
          {...createSanityDataAttribute(documentId, documentType, 'heroTitle')}>
          {stegaClean(heroTitle)}
        </Heading>
      )}
      {heroSubtitle && (
        <div
          className={`text-body-lg sm:text-body-2xl ${getTextColorClasses()}`}
          style={{ whiteSpace: 'pre-line' }}
          {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
          {typeof heroSubtitle === 'string'
            ? stegaClean(heroSubtitle)
            : 'Please update subtitle in Sanity Studio'}
        </div>
      )}
      <div {...createSanityDataAttribute(documentId, documentType, 'heroCallToAction')}>
        {renderCTA()}
      </div>
    </div>
  );

  if (!shouldShowLogo) {
    // No logo - just show content with positioning
    return (
      <div
        className={`absolute z-[25] ${getTextColorClasses()} ${getPositionClasses(heroContentPosition || 'center-center')}`}
        {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
        {ContentComponent}
      </div>
    );
  }

  // Show logo above content with positioning
  return (
    <div
      className={`absolute z-[25] ${getTextColorClasses()} ${getPositionClasses(heroContentPosition || 'center-center')}`}
      {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
      <div className={`flex flex-col ${logoConfig.alignment} ${logoConfig.spacing}`}>
        {LogoComponent}
        {ContentComponent}
      </div>
    </div>
  );
};

export default HeroContent;