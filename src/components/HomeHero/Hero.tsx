import styles from './styles.module.css';
import HeroImages from './HeroImages';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import EmbeddedCTAButton from '../blocks/EmbeddedCTAButton';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';
import Heading from '../Typography/Heading/Heading';
import { heroBottomSpacing } from '@/utils/spacingConstants';

interface HeroProps {
  heroImage: NonNullable<HOME_PAGE_QUERYResult>['heroImage'];
  heroTitle: NonNullable<HOME_PAGE_QUERYResult>['heroTitle'];
  heroSubtitle: NonNullable<HOME_PAGE_QUERYResult>['heroSubtitle'];
  enableHeroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['enableHeroCallToAction'];
  heroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['heroCallToAction'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  documentId: string;
  documentType: string;
}

const Hero = ({
  heroImage,
  heroTitle,
  heroSubtitle,
  enableHeroCallToAction,
  heroCallToAction,
  heroContentPosition,
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

  // Map content position to Tailwind classes
  const getPositionClasses = (position: string) => {
    // Clean the position string to remove any invisible Unicode characters
    const cleanPosition =
      position?.trim().replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, '') ||
      'center-center';

    // Base mobile classes - always centered with consistent spacing
    const mobileBase = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center px-4 py-4';
    const mobileCenterClasses = 'left-1/2 transform -translate-x-1/2 w-[85%] text-center';

    // Desktop positioning variants
    const desktopVariants = {
      left: 'md:left-10 lg:left-20 md:right-auto md:text-left md:transform-none md:translate-x-0 md:w-auto md:px-0',
      center: 'md:left-1/2 md:right-auto md:text-center md:transform md:-translate-x-1/2 md:w-[85%] md:px-0',
      right: 'md:right-10 lg:right-20 md:left-auto md:text-right md:transform-none md:translate-x-0 md:w-auto md:px-0',
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

  const renderCTA = () => {
    // First check if CTA is enabled
    if (!enableHeroCallToAction) return null;

    // If CTA is enabled but no heroCallToAction object, return null
    if (!heroCallToAction) return null;

    // Use EmbeddedCTAButton component
    return <EmbeddedCTAButton {...heroCallToAction} />;
  };

  return (
    <section
      id='home'
      className={`relative ${styles['hero-height']} bg-black flex flex-col justify-center ${heroBottomSpacing}`}>
      {/* Z-index hierarchy: Images (z-10) → Gradient (z-20) → Content (z-[25]) → Header (z-30) → Mobile menu (z-40) */}
      {images.length > 0 && <HeroImages images={images} />}
      <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
      <div
        className={`absolute z-[25] text-white space-y-4 ${getPositionClasses(heroContentPosition || 'center-center')}`}
        {...createSanityDataAttribute(documentId, documentType, 'heroContentPosition')}>
        {heroTitle && (
          <Heading
            level='h1'
            className='text-h4 sm:text-h2 font-bold'
            {...createSanityDataAttribute(documentId, documentType, 'heroTitle')}>
            {heroTitle}
          </Heading>
        )}
        {heroSubtitle && (
          <div
            className='text-body-lg sm:text-body-xl text-white'
            style={{ whiteSpace: 'pre-line' }}
            {...createSanityDataAttribute(documentId, documentType, 'heroSubtitle')}>
            {typeof heroSubtitle === 'string'
              ? heroSubtitle
              : 'Please update subtitle in Sanity Studio'}
          </div>
        )}
        <div {...createSanityDataAttribute(documentId, documentType, 'heroCallToAction')}>
          {renderCTA()}
        </div>
      </div>
    </section>
  );
};

export default Hero;
