'use client';

import React, { useState } from 'react';
import Heading from '../Typography/Heading/Heading';
import FallbackBackground from './FallbackBackground';
import Breadcrumb from '../UI/Breadcrumb';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { heroBottomSpacing } from '@/utils/spacingConstants';

interface PageHeroProps {
  title?: string | null;
  heroImage?: unknown | string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
  documentId?: string;
  documentType?: string;
  // Breadcrumb props
  showBreadcrumb?: boolean;
  breadcrumbPageTitle?: string;
  breadcrumbClickable?: boolean;
  breadcrumbHref?: string;
}

const PageHero = ({
  title = null,
  heroImage,
  documentId,
  documentType,
  showBreadcrumb = false,
  breadcrumbPageTitle,
  breadcrumbClickable = false,
  breadcrumbHref,
}: PageHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if we have a custom hero image (either Sanity image or URL string)
  const isStringUrl = typeof heroImage === 'string';
  const heroImageData = !isStringUrl
    ? (heroImage as { asset?: { _ref: string; _type: string } })
    : null;
  const hasSanityImage = heroImageData?.asset;
  const hasCustomImage = isStringUrl || hasSanityImage;


  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <section
        data-hero
        className={`relative h-48 md:h-64 bg-black flex items-center justify-center overflow-hidden px-5 ${heroBottomSpacing}`}>
        {/* Background */}
        {hasCustomImage ? (
          <UnifiedImage
            src={isStringUrl ? (heroImage as string) : heroImageData}
            alt=''
            mode="fill"
            sizeContext="hero"
            objectFit="cover"
            priority
            className={`z-10 transition-opacity duration-500 ease-in-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <FallbackBackground />
        )}

        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbPageTitle && (
          <div className='absolute top-2 left-2 md:top-8 md:left-8 z-[26]'>
            <Breadcrumb
              pageTitle={breadcrumbPageTitle}
              pageTitleClickable={breadcrumbClickable}
              pageTitleHref={breadcrumbHref}
            />
          </div>
        )}

        {/* Text Content with Dark Overlay */}
        {title && (
          <div className='relative z-[25] text-white text-center py-1 px-5 mt-6 md:mt-0 bg-black/20 backdrop-blur-sm rounded-lg -m-2'>
            <Heading level='h1' showUnderline className='text-h2 md:text-h1 font-bold'>
              {title}
            </Heading>
          </div>
        )}
      </section>
    </div>
  );
};

export default PageHero;
