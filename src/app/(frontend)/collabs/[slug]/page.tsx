import React from 'react';
import { notFound } from 'next/navigation';
import { getCollab, getCollabSlugsForGeneration, getCollabs } from '@/actions/collabs';
import { getSiteSettings } from '@/actions';
import CollabMainContent from '@/components/Collab/CollabMainContent';
import CollabBasicInfo from '@/components/Collab/CollabBasicInfo';
import CollabLinks from '@/components/Collab/CollabLinks';
import CollabSideContent from '@/components/Collab/CollabSideContent';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';

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
  // Company links are now handled separately in the layout

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title={collab.name}
        heroImage={collab.heroImage}
        documentId={collab._id}
        documentType={collab._type}
      />
      <Container textAlign='left'>
        {/* Short Description */}
        <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center mb-8'>
          {collab.shortDescription}
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] auto-rows-min gap-8'>
          {/* Basic Info & Links */}
          <div className='col-start-1 lg:col-start-2 self-start'>
            <div className='mb-4'>
              <CollabBasicInfo
                genre={collab.genre}
                location={collab.location}
                previewImage={collab.previewImage}
                documentId={collab._id}
                documentType={collab._type}
              />
            </div>
            <CollabLinks links={collab.links} documentId={collab._id} documentType={collab._type} />

            {/* Side Content Blocks - Desktop */}
            <div className='hidden lg:block col-start-1 lg:col-start-2 row-start-3 lg:row-start-2 self-start mt-8'>
              <CollabSideContent
                sideContent={collab.sideContent}
                documentId={collab._id}
                documentType={collab._type}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className='col-start-1 row-start-2 lg:row-start-1 lg:row-span-2 self-start'>
            <CollabMainContent
              bio={collab.bio}
              mainContent={collab.mainContent}
              collabId={collab._id}
              collabType={collab._type}
              siteSettings={siteSettings ? { companyEmail } : undefined}
              collabs={collabs}
            />
          </div>

          {/* Side Content Blocks - Mobile */}
          <div className='block lg:hidden col-start-1 lg:col-start-2 row-start-3 lg:row-start-2 self-start'>
            <CollabSideContent
              sideContent={collab.sideContent}
              documentId={collab._id}
              documentType={collab._type}
            />
          </div>
        </div>
      </Container>
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
