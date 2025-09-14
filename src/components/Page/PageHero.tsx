'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '../Typography/Heading/Heading';
import FallbackBackground from './FallbackBackground';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import { heroBottomSpacing } from '@/utils/spacingConstants';

interface PageHeroProps {
  title?: string | null;
  heroImage?: unknown | string;
  height?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
  hideBackLink?: boolean;
  backLinkText?: string;
  backLinkHref?: string;
  documentId?: string;
  documentType?: string;
}

const PageHero = ({
  title = null,
  heroImage,
  documentId,
  documentType,
  hideBackLink = false,
  backLinkText,
  backLinkHref = '/',
}: PageHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if we have a custom hero image (either Sanity image or URL string)
  const isStringUrl = typeof heroImage === 'string';
  const heroImageData = !isStringUrl
    ? (heroImage as { asset?: { _ref: string; _type: string } })
    : null;
  const hasSanityImage = heroImageData?.asset;
  const hasCustomImage = isStringUrl || hasSanityImage;

  const customBackgroundImage = isStringUrl
    ? (heroImage as string)
    : hasSanityImage && heroImageData.asset
      ? urlFor(heroImageData.asset).url()
      : null;

  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <section
        data-hero
        className={`relative h-48 md:h-64 bg-black flex items-center justify-center overflow-hidden px-5 ${heroBottomSpacing}`}>
        {/* Background */}
        {hasCustomImage ? (
          <Image
            src={customBackgroundImage!}
            alt=''
            fill
            className={`object-cover z-10 transition-opacity duration-500 ease-in-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <FallbackBackground />
        )}

        {/* Back Link */}
        {!hideBackLink && (
          <div className='absolute top-2 left-2 md:top-8 md:left-8 z-[26]'>
            <Link
              href={backLinkHref}
              className='inline-flex items-center gap-2 text-white hover:bg-black active:scale-90 transition-all duration-200 text-body-base bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 md:py-2 border border-white/20'>
              <span>←</span>
              {backLinkText && <span>{backLinkText}</span>}
            </Link>
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
