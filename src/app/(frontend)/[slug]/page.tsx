import React from 'react';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import { getPageBySlug, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import { pageSubtitleBottomSpacing, closingCardSpacing } from '@/utils/spacingConstants';
import PageSubtitle from '@/components/Typography/PageSubtitle';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  getOrganizationDataFromSiteSettings,
  generateStructuredDataScript
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';
import { urlFor } from '@/sanity/lib/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [siteSettings, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlug(slug),
  ]);

  if (!siteSettings) {
    return {
      title: 'Page | 07:17 Records',
      description: 'Discover more about our content',
    };
  }

  if (!page) {
    return {
      title: 'Page Not Found | 07:17 Records',
      description: 'The page you are looking for could not be found.',
    };
  }

  return generatePageMetadata({
    title: page.title || undefined,
    description: page.subtitle || siteSettings.siteDescription || undefined,
    siteSettings,
    canonicalUrl: generateCanonicalUrl(`/${slug}`),
  });
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [page, siteSettings, events, collabs, favourites, companyLinks] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
    getAllEvents(),
    getCollabs(),
    getFavourites(),
    getCompanyLinks(),
  ]);

  if (!page) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: page.title || 'Page', url: `${baseUrl}/${slug}` },
  ];

  // Generate Article structured data
  let articleSchema;
  if (siteSettings && page._createdAt && page._updatedAt) {
    const organizationData = getOrganizationDataFromSiteSettings(siteSettings, baseUrl);

    articleSchema = generateArticleSchema({
      headline: page.title || 'Page',
      description: page.subtitle || undefined,
      image: page.heroImage ? urlFor(page.heroImage).width(1200).height(630).url() : undefined,
      datePublished: page._createdAt,
      dateModified: page._updatedAt,
      author: {
        name: siteSettings.siteTitle || '07:17 Records',
        type: 'Organization',
      },
      publisher: organizationData,
      url: `${baseUrl}/${slug}`,
    });
  }

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {articleSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={generateStructuredDataScript(articleSchema)}
        />
      )}

      {/* Page Hero */}
      <PageHero
        title={page.title || 'Untitled Page'}
        heroImage={page.heroImage || '/images/hero-bg/hero-bg-option2.webp'}
        documentId={page._id}
        documentType={page._type}
        showBreadcrumb={true}
        breadcrumbPageTitle={page.title || 'Untitled Page'}
      />

      <Container>
        {/* Page Subtitle */}
        {page.subtitle && (
          <div className={pageSubtitleBottomSpacing}>
            <PageSubtitle>{page.subtitle}</PageSubtitle>
          </div>
        )}

        {/* Page Content */}
        {page.content && (
          <PageBuilder
            content={page.content}
            documentId={page._id}
            documentType={page._type}
            siteSettings={
              siteSettings
                ? {
                    companyEmail: siteSettings.companyEmail || undefined,
                  }
                : undefined
            }
            events={events}
            collabs={collabs}
            favourites={favourites}
            companyLinks={companyLinks}
          />
        )}

        {/* Closing Card */}
        {page.hasClosingCard && page.closingCard && (
          <div className={closingCardSpacing}>
            <Card
              {...(page.closingCard as NonNullable<typeof page.closingCard>)}
              documentId={page._id}
              documentType={page._type}
              fieldPathPrefix='closingCard'
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Page;
