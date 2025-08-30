import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import { getPageBySlug, getSiteSettings } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import Container from '@/components/Layout/Container';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [page, siteSettings, events, collabs, favourites] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
    getAllEvents(),
    getCollabs(),
    getFavourites(),
  ]);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      {/* Page Hero */}
      <PageHero title={page.title || 'Untitled Page'} />

      <Container textAlign='center'>
        {/* Page Subtitle */}
        {page.subtitle && (
          <div className='container mx-auto px-4 md:px-8 py-8'>
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
                    companyLinks: siteSettings.companyLinks || undefined,
                  }
                : undefined
            }
            events={events}
            collabs={collabs}
            favourites={favourites}
            alignment={page.alignment || 'center'}
          />
        )}
      </Container>
    </>
  );
};

export default Page;
