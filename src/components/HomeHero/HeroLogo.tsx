import React from 'react';
import UnifiedImage from '@/components/UI/UnifiedImage';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';

interface HeroLogoProps {
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
  showLogoBackColor?: boolean;
}

const HeroLogo = ({
  showHeroLogo,
  heroTextColor,
  enableFeaturedItems,
  documentId,
  documentType,
  showLogoBackColor = false,
}: HeroLogoProps) => {
  if (showHeroLogo === false) return null;

  const logoSize = enableFeaturedItems ? 'w-20 md:w-24 lg:w-28' : 'w-48 md:w-56 lg:w-64';
  const logoSrc = stegaClean(heroTextColor) === 'white'
    ? '/images/logo-white-on-transparent.png'
    : '/images/logo-black-on-transparent.png';

  return (
    <div
      className='flex justify-center items-center relative'
      {...createSanityDataAttribute(documentId, documentType, 'showHeroLogo')}>
      <UnifiedImage
        src={logoSrc}
        alt='07:17 Records Logo'
        mode="sized"
        width={500}
        height={500}
        sizeContext="hero"
        objectFit="contain"
        className={`${logoSize} h-auto relative z-10 drop-shadow-lg drop-shadow-black/40`}
      />
      {showLogoBackColor && (
        <>
          <div className='absolute top-1/2 left-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-[25vw] lg:h-[25vw] rounded-full bg-gradient-to-br from-[#ffea00]/20 to-[#ffea00]/10 transform -translate-y-1/2 -translate-x-1/2 blur-md' />
          <div className='absolute top-1/2 left-1/2 w-50 h-50 lg:w-[20vw] lg:h-[20vw] rounded-full bg-gradient-to-br from-[#ffea00]/30 to-[#ffea00]/20 transform -translate-y-1/2 -translate-x-1/2 blur-sm' />
        </>
      )}
    </div>
  );
};

export default HeroLogo;
