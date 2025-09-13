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
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';

interface CollabSlug {
  slug: string;
}

interface CollabPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollabPageProps) {
  const { slug } = await params;
  const [siteSettings, collab] = await Promise.all([
    getSiteSettings(),
    getCollab(slug),
  ]);

  if (!siteSettings) {
    return {
      title: 'Collaboration | 07:17 Records',
      description: 'Discover our latest collaboration',
    };
  }

  if (!collab) {
    return {
      title: 'Collaboration Not Found | 07:17 Records',
      description: 'The collaboration you are looking for could not be found.',
    };
  }

  return generatePageMetadata({
    title: collab.name || undefined,
    description: collab.shortDescription || siteSettings.siteDescription || undefined,
    siteSettings,
    image: collab.previewImage?.asset?._ref ? collab.previewImage : undefined, // Only pass image if it exists, otherwise use default
  });
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
        heroImage={collab.heroImage || '/images/hero-bg/hero-bg-option3-2.webp'}
        documentId={collab._id}
        documentType={collab._type}
      />
      <Container textAlign='left'>
        {/* Short Description */}
        {collab.shortDescription && <PageSubtitle>{collab.shortDescription}</PageSubtitle>}

        <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] auto-rows-min lg:gap-12'>
          {/* Basic Info & Links */}
          <div className='col-start-1 lg:col-start-2 self-start mb-16 lg:mb-0'>
            <div className='mb-4'>
              <CollabBasicInfo
                category={collab.category}
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
