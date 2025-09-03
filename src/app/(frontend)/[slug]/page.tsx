import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import { getPageBySlug, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import Container from '@/components/Layout/Container';
import Card from '@/components/blocks/Card';
import { pageSubtitleBottomSpacing, closingCardSpacing } from '@/utils/spacingConstants';

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
    return <div>Page not found</div>;
  }

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={page.title || 'Untitled Page'}
        heroImage={page.heroImage}
        documentId={page._id}
        documentType={page._type}
      />

      <Container>
        {/* Page Subtitle */}
        {page.subtitle && (
          <div className={pageSubtitleBottomSpacing}>
            <p className='text-body-3xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line text-center'>
              {page.subtitle}
            </p>
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
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default Page;
