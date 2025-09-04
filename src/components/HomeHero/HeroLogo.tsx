import React from 'react';
import Image from 'next/image';
import { stegaClean } from '@sanity/client/stega';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';

interface HeroLogoProps {
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  documentId: string;
  documentType: string;
}

const HeroLogo = ({
  showHeroLogo,
  heroTextColor,
  enableFeaturedItems,
  documentId,
  documentType,
}: HeroLogoProps) => {
  if (showHeroLogo === false) return null;

  const logoSize = enableFeaturedItems ? 'w-20 md:w-24 lg:w-28' : 'w-48 md:w-56 lg:w-64 mb-4';

  return (
    <div
      className='flex justify-center'
      {...createSanityDataAttribute(documentId, documentType, 'showHeroLogo')}>
      <Image
        src={
          stegaClean(heroTextColor) === 'white'
            ? '/images/logo-white-on-transparent.png'
            : '/images/logo-black-on-transparent.png'
        }
        alt='07:17 Records Logo'
        width={500}
        height={500}
        className={`${logoSize} h-auto object-contain`}
      />
    </div>
  );
};

export default HeroLogo;
