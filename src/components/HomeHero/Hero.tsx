import styles from './styles.module.css';
import HeroImages from './HeroImages';
import DefaultHeroBackground from './DefaultHeroBackground';
import RegularHeroLayout from './RegularHeroLayout';
import FeaturedItemsHeroLayout from './FeaturedItemsHeroLayout';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import { heroBottomSpacing } from '@/utils/spacingConstants';
import { stegaClean } from '@sanity/client/stega';

interface HeroProps {
  heroStyle: NonNullable<HOME_PAGE_QUERYResult>['heroStyle'];
  heroTextColor: NonNullable<HOME_PAGE_QUERYResult>['heroTextColor'];
  showHeroLogo: NonNullable<HOME_PAGE_QUERYResult>['showHeroLogo'];
  heroImage: NonNullable<HOME_PAGE_QUERYResult>['heroImage'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  heroCallToActionList: NonNullable<HOME_PAGE_QUERYResult>['heroCallToActionList'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  enableFeaturedItems: NonNullable<HOME_PAGE_QUERYResult>['enableFeaturedItems'];
  featuredImages: NonNullable<HOME_PAGE_QUERYResult>['featuredImages'];
  documentId: string;
  documentType: string;
}

const Hero = ({
  heroStyle,
  heroTextColor,
  showHeroLogo,
  heroImage,
  heroTitle,
  heroSubtitle,
  heroCallToActionList,
  heroContentPosition,
  enableFeaturedItems,
  featuredImages,
  documentId,
  documentType,
}: HeroProps) => {
  // Convert single Sanity image to array format for HeroImages component
  const images = heroImage
    ? [
        {
          imageUrl: urlFor(heroImage).width(1920).height(1080).url(),
          altText: heroImage.alt || 'Hero background image',
        },
      ]
    : [];

  // Determine hero style - default to 'default' if not provided, clean any stega characters
  const currentHeroStyle = stegaClean(heroStyle) || 'default';

  return (
    <section
      id='home'
      className={`relative ${styles['hero-height']} flex flex-col justify-center ${heroBottomSpacing}`}>
      {/* Z-index hierarchy: Background (z-10) → Gradient (z-20) → Content (z-[25]) → Header (z-30) → Mobile menu (z-40) */}

      {/* Hero Style Click-to-Edit Wrapper */}
      <div
        {...createSanityDataAttribute(documentId, documentType, 'heroStyle')}
        className='absolute inset-0 pointer-events-none z-0'
      />

      {/* Text Color Click-to-Edit Wrapper */}
      <div
        {...createSanityDataAttribute(documentId, documentType, 'heroTextColor')}
        className='absolute inset-0 pointer-events-none z-0'
      />

      {/* Background Images Hero Style */}
      {currentHeroStyle === 'background-images' && (
        <>
          {images.length > 0 && <HeroImages images={images} />}
          <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
        </>
      )}

      {/* Default Hero Style */}
      {currentHeroStyle === 'default' && (
        <div className='absolute z-10'>
          <DefaultHeroBackground />
        </div>
      )}

      {/* Content */}
      {enableFeaturedItems ? (
        <FeaturedItemsHeroLayout
          heroTextColor={heroTextColor}
          showHeroLogo={showHeroLogo}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          heroCallToActionList={heroCallToActionList}
          enableFeaturedItems={enableFeaturedItems}
          featuredImages={featuredImages}
          documentId={documentId}
          documentType={documentType}
        />
      ) : (
        <RegularHeroLayout
          heroTextColor={heroTextColor}
          showHeroLogo={showHeroLogo}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          heroCallToActionList={heroCallToActionList}
          heroContentPosition={heroContentPosition}
          enableFeaturedItems={enableFeaturedItems}
          documentId={documentId}
          documentType={documentType}
        />
      )}
    </section>
  );
};

export default Hero;
