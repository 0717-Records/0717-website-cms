import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/Typography/Heading/Heading';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';
import FallbackBackground from './FallbackBackground';

interface CollabHeroProps {
  name: string | null;
  heroImage?: unknown;
  documentId?: string;
  documentType?: string;
}

export default function CollabHero({ name, heroImage, documentId, documentType }: CollabHeroProps) {
  // Check if we have a custom hero image
  const heroImageData = heroImage as { asset?: { _ref: string; _type: string } };
  const hasCustomImage = heroImageData?.asset;
  const customBackgroundImage =
    hasCustomImage && heroImageData.asset ? urlFor(heroImageData.asset).url() : null;

  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <section className='relative h-48 md:h-64 bg-black flex items-center justify-center overflow-hidden'>
        {/* Background */}
        {hasCustomImage ? (
          <Image src={customBackgroundImage!} alt='' fill className='object-cover z-10' priority />
        ) : (
          <FallbackBackground />
        )}

        {/* Back Link */}
        <div className='absolute top-4 left-4 md:top-8 md:left-8 z-[25]'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-white hover:bg-black active:scale-90 transition-all duration-200 text-body-sm md:text-body-base bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20'>
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Text Content with Dark Overlay */}
        <div className='relative z-[25] text-white text-center px-4'>
          {/* Dark overlay behind text */}
          <div className='absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg -m-2'></div>
          <div className='relative z-10'>
            <Heading level='h1' showUnderline className='text-h5 md:text-h3 font-bold mb-2'>
              {name || 'Collaboration'}
            </Heading>
          </div>
        </div>
      </section>
    </div>
  );
}
