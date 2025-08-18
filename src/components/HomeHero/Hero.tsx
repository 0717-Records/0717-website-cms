import styles from './styles.module.css';
import HeroImages from './HeroImages';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import { createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import EmbeddedCTAButton from '../blocks/EmbeddedCTAButton';

const { projectId, dataset, stega } = client.config();
const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

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

    const positionMap: Record<string, string> = {
      // Mobile: Always centered horizontally with responsive width, only vertical positioning applies
      // Desktop: Full positioning as specified
      'top-left':
        'top-4 left-4 right-4 text-center px-4 py-4 md:top-10 md:left-10 lg:left-20 md:right-auto md:text-left md:p-0 md:transform-none md:translate-x-0',
      'top-center':
        'top-4 left-4 right-4 text-center px-4 py-4 md:top-10 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:p-0',
      'top-right':
        'top-4 left-4 right-4 text-center px-4 py-4 md:top-10 md:right-10 lg:right-20 md:left-auto md:text-right md:p-0',
      'center-left':
        'top-1/2 left-4 right-4 transform -translate-y-1/2 text-center px-4 py-4 md:left-10 lg:left-20 md:right-auto md:text-left md:p-0 md:translate-x-0',
      'center-center':
        'top-1/2 left-4 right-4 transform -translate-y-1/2 text-center px-4 py-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:p-0',
      'center-right':
        'top-1/2 left-4 right-4 transform -translate-y-1/2 text-center px-4 py-4 md:right-10 lg:right-20 md:left-auto md:text-right md:p-0 md:translate-x-0',
      'bottom-left':
        'bottom-4 left-4 right-4 text-center px-4 py-4 md:bottom-10 md:left-10 lg:left-20 md:right-auto md:text-left md:p-0',
      'bottom-center':
        'bottom-4 left-4 right-4 text-center px-4 py-4 md:bottom-10 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:p-0',
      'bottom-right':
        'bottom-4 left-4 right-4 text-center px-4 py-4 md:bottom-10 md:right-10 lg:right-20 md:left-auto md:text-right md:p-0',
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
      className={`relative ${styles['hero-height']} bg-black flex flex-col justify-center`}>
      {/* Z-index hierarchy: Images (z-10) → Gradient (z-20) → Content (z-[25]) → Header (z-30) → Mobile menu (z-40) */}
      {images.length > 0 && <HeroImages images={images} />}
      <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
      <div
        className={`absolute z-[25] text-white space-y-4 ${getPositionClasses(heroContentPosition || 'center-center')}`}
        data-sanity={createDataAttribute({
          ...createDataAttributeConfig,
          id: documentId,
          type: documentType,
          path: 'heroContentPosition',
        }).toString()}>
        {heroTitle && (
          <h1
            className='text-4xl sm:text-6xl font-bold'
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: 'heroTitle',
            }).toString()}>
            {heroTitle}
          </h1>
        )}
        {heroSubtitle && (
          <div
            className='text-lg sm:text-xl text-white'
            style={{ whiteSpace: 'pre-line' }}
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: 'heroSubtitle',
            }).toString()}>
            {typeof heroSubtitle === 'string' ? heroSubtitle : 'Please update subtitle in Sanity Studio'}
          </div>
        )}
        <div
          data-sanity={createDataAttribute({
            ...createDataAttributeConfig,
            id: documentId,
            type: documentType,
            path: 'heroCallToAction',
          }).toString()}>
          {renderCTA()}
        </div>
      </div>
    </section>
  );
};

export default Hero;
