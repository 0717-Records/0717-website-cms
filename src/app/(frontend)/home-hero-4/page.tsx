import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Container from '@/components/Layout/Container';

const Page = async () => {
  const [page, siteSettings, events, collabs, favourites, companyLinks] = await Promise.all([
    getHomePage(),
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
      {/* Hero Section */}
      <Hero
        heroStyle='background-images'
        heroTextColor='white'
        showHeroLogo={false}
        heroBackgroundImages={page.heroBackgroundImages}
        heroImageTransitionDuration={4}
        heroTitle='Demo Hero 4 - Featured Items on background images'
        heroSubtitle='This showcases the background images hero style with featured items.'
        heroCallToActionList={[
          {
            _type: 'embeddedCtaButton',
            _key: 'demo-cta-1',
            text: 'View Events',
            linkType: 'internal',
            internalLink: null,
            computedHref: '/events',
            variant: 'filled',
          },
          {
            _type: 'embeddedCtaButton',
            _key: 'demo-cta-2',
            text: 'Buy Tickets',
            linkType: 'external',
            internalLink: null,
            externalUrl: 'https://www.0717records.com/',
            computedHref: 'https://www.0717records.com/',
            variant: 'filled',
          },
        ]}
        heroContentPosition={page.heroContentPosition}
        enableFeaturedItems={true}
        featuredImages={page.featuredImages}
        documentId={page._id}
        documentType={page._type}
      />

      {/* Additional Page Builder Content */}
      {page.content && (
        <Container>
          <PageBuilder
            content={page.content as NonNullable<PAGE_QUERYResult>['content']}
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
            alignment='center'
          />
        </Container>
      )}
    </>
  );
};

export default Page;
