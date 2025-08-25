import React from 'react';
import { notFound } from 'next/navigation';
import { getCollab, getCollabSlugsForGeneration, getCollabs } from '@/actions/collabs';
import { getSiteSettings } from '@/actions';
import CollabShortDescription from '@/components/Collab/CollabShortDescription';
import CollabMainContent from '@/components/Collab/CollabMainContent';
import CollabBasicInfo from '@/components/Collab/CollabBasicInfo';
import CollabLinks from '@/components/Collab/CollabLinks';
import CollabSideContent from '@/components/Collab/CollabSideContent';
import PageHero from '@/components/Page/PageHero';

interface CollabSlug {
  slug: string;
}

interface CollabPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollabPage({ params }: CollabPageProps) {
  const { slug } = await params;
  const [collab, siteSettings, collabs] = await Promise.all([
    getCollab(slug),
    getSiteSettings(),
    getCollabs(),
  ]);

  if (!collab) {
    notFound();
  }

  const companyEmail = siteSettings?.companyEmail || undefined;

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title={collab.name}
        heroImage={collab.heroImage}
        documentId={collab._id}
        documentType={collab._type}
      />

      {/* Short Description */}
      <CollabShortDescription shortDescription={collab.shortDescription} />

      {/* Mobile Basic Info - Only visible on mobile, positioned between subtitle and bio */}
      <div className='lg:hidden container mx-auto px-4 md:px-8 pb-8 space-y-6'>
        <CollabBasicInfo
          genre={collab.genre}
          location={collab.location}
          previewImage={collab.previewImage}
          documentId={collab._id}
          documentType={collab._type}
        />

        {/* Mobile Links - Only visible on mobile */}
        <CollabLinks links={collab.links} documentId={collab._id} documentType={collab._type} />
      </div>

      {/* Two Column Layout */}
      <div className='container mx-auto px-4 md:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Left Column - Main Content (2/3 width) */}
          <div className='lg:col-span-2'>
            <CollabMainContent
              bio={collab.bio}
              mainContent={collab.mainContent}
              collabId={collab._id}
              collabType={collab._type}
              siteSettings={siteSettings ? { companyEmail } : undefined}
              collabs={collabs}
            />
          </div>

          {/* Right Column - Sidebar Content (1/3 width) */}
          <div className='space-y-6'>
            {/* Basic Info - Only visible on desktop */}
            <div className='hidden lg:block'>
              <CollabBasicInfo
                genre={collab.genre}
                location={collab.location}
                previewImage={collab.previewImage}
                documentId={collab._id}
                documentType={collab._type}
              />
            </div>

            {/* Links - Only visible on desktop */}
            <div className='hidden lg:block'>
              <CollabLinks
                links={collab.links}
                documentId={collab._id}
                documentType={collab._type}
              />
            </div>

            {/* Side Content Blocks */}
            <CollabSideContent
              sideContent={collab.sideContent}
              companyEmail={companyEmail}
              documentId={collab._id}
              documentType={collab._type}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static params for all collab slugs
export async function generateStaticParams() {
  const collabSlugs = await getCollabSlugsForGeneration();
  return collabSlugs.map((item: CollabSlug) => ({
    slug: item.slug,
  }));
}
