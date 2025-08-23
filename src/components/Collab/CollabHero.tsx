import React from 'react';
import PageHero from '@/components/Page/PageHero';
import { urlFor } from '@/sanity/lib/image';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CollabHeroProps {
  name: string | null;
  heroImage?: unknown;
  documentId?: string;
  documentType?: string;
}

export default function CollabHero({ name, heroImage, documentId, documentType }: CollabHeroProps) {
  // Get background image or use black background
  const heroImageData = heroImage as { asset?: { _ref: string; _type: string } };
  const backgroundImage = heroImageData?.asset 
    ? urlFor(heroImageData.asset).url()
    : null;

  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroImage')}>
      <PageHero
        title={name || 'Collaboration'}
        height='medium'
        showBackLink={true}
        backLinkText='Back to Home'
        backLinkHref='/'
        backgroundImage={backgroundImage || undefined}
        className={!backgroundImage ? 'bg-black' : ''}
      />
    </div>
  );
}