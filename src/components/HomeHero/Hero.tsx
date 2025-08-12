import styles from './styles.module.css';
import HeroImages from './HeroImages';
import Link from 'next/link';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import { urlFor } from '@/sanity/lib/image';
import { createDataAttribute } from 'next-sanity';
import { client } from '@/sanity/lib/client';

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
  heroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['heroCallToAction'];
  heroContentPosition: NonNullable<HOME_PAGE_QUERYResult>['heroContentPosition'];
  documentId: string;
  documentType: string;
}

const Hero = ({
  heroImage,
  heroTitle,
  heroSubtitle,
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
      'top-left': 'top-4 md:top-10 left-4 md:left-10 lg:left-20 text-left p-4 md:p-0',
      'top-center': 'top-4 md:top-10 left-1/2 transform -translate-x-1/2 text-center p-4 md:p-0',
      'top-right': 'top-4 md:top-10 right-4 md:right-10 lg:right-20 text-right p-4 md:p-0',
      'center-left':
        'top-1/2 left-4 md:left-10 lg:left-20 transform -translate-y-1/2 text-left p-4 md:p-0',
      'center-center':
        'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-4 md:p-0',
      'center-right':
        'top-1/2 right-4 md:right-10 lg:right-20 transform -translate-y-1/2 text-right p-4 md:p-0',
      'bottom-left': 'bottom-4 md:bottom-10 left-4 md:left-10 lg:left-20 text-left p-4 md:p-0',
      'bottom-center':
        'bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center p-4 md:p-0',
      'bottom-right': 'bottom-4 md:bottom-10 right-4 md:right-10 lg:right-20 text-right p-4 md:p-0',
    };

    return positionMap[cleanPosition] || positionMap['center-center'];
  };

  const renderCTA = () => {
    if (!heroCallToAction?.text) return null;

    const baseClasses =
      'inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200';

    if (heroCallToAction.linkType === 'external' && heroCallToAction.externalLink) {
      return (
        <a
          href={heroCallToAction.externalLink}
          target={heroCallToAction.openInNewTab ? '_blank' : undefined}
          rel={heroCallToAction.openInNewTab ? 'noopener noreferrer' : undefined}
          className={baseClasses}>
          {heroCallToAction.text}
        </a>
      );
    }

    if (heroCallToAction.linkType === 'internal' && heroCallToAction.internalLink?.slug?.current) {
      return (
        <Link href={`/${heroCallToAction.internalLink.slug.current}`} className={baseClasses}>
          {heroCallToAction.text}
        </Link>
      );
    }

    return <button className={baseClasses}>{heroCallToAction.text}</button>;
  };

  return (
    <section
      id='home'
      className={`relative ${styles['hero-height']} bg-black flex flex-col justify-center`}>
      {images.length > 0 && <HeroImages images={images} />}
      <div className='absolute inset-0 bg-gradient-to-t from-black from-20% to-transparent opacity-90 z-20' />
      <div
        className={`absolute z-30 text-white space-y-4 ${getPositionClasses(heroContentPosition || 'center-center')}`}
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
            className='text-2xl sm:text-4xl prose prose-invert max-w-none [&>*]:text-white'
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: 'heroSubtitle',
            }).toString()}>
            <PortableText value={heroSubtitle} components={components} />
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
