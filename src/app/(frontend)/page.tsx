import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import type { PAGE_QUERYResult } from '@/sanity/types';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  if (!siteSettings) {
    return {
      title: '07:17 Records | Thank You For Creating',
      description: 'Welcome to 07:17 Records',
    };
  }

  return generatePageMetadata({
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/'),
  });
}

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
        heroStyle={page.heroStyle}
        heroTextColor={page.heroTextColor}
        showHeroLogo={page.showHeroLogo}
        heroBackgroundImages={page.heroBackgroundImages}
        heroImageTransitionDuration={page.heroImageTransitionDuration}
        heroTitle={page.heroTitle}
        heroSubtitle={page.heroSubtitle}
        heroCallToActionList={page.heroCallToActionList}
        heroContentPosition={page.heroContentPosition}
        enableFeaturedItems={page.enableFeaturedItems}
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
