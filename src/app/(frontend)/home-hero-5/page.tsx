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
        heroTitle='Demo Hero 5 - Content Position'
        heroSubtitle={[
          {
            _type: 'block',
            _key: 'demo-subtitle-5',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'demo-span-5',
                text: 'This showcases the bottom-right content position, with logo switched off. All 9 positions are supported.',
                marks: []
              }
            ]
          }
        ]}
        heroFeaturedItemsSubtitle={null}
        heroCallToActionList={[
          {
            _type: 'embeddedCtaButton',
            _key: 'demo-cta-5',
            text: 'Explore More',
            linkType: 'internal',
            internalLink: null,
            computedHref: '/',
            variant: 'filled',
          },
        ]}
        heroContentPosition='bottom-right'
        enableFeaturedItems={false}
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
