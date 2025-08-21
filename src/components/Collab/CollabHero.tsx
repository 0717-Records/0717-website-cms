import React from 'react';
import PageHero from '@/components/Page/PageHero';
import { stegaClean } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

interface CollabHeroProps {
  name: string | null;
  heroImage?: unknown;
}

export default function CollabHero({ name, heroImage }: CollabHeroProps) {
  // Get background image or use black background
  const heroImageData = heroImage as { asset?: { _ref: string; _type: string } };
  const backgroundImage = heroImageData?.asset 
    ? urlFor(heroImageData.asset).url()
    : null;

  return (
    <PageHero
      title={stegaClean(name) || 'Collaboration'}
      height='medium'
      showBackLink={true}
      backLinkText='Back to Home'
      backLinkHref='/'
      backgroundImage={backgroundImage || undefined}
      className={!backgroundImage ? 'bg-black' : ''}
    />
  );
}