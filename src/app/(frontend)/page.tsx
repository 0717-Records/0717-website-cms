import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage, getSiteSettings } from '@/actions';
import { getAllEvents } from '@/actions/events';
import type { PAGE_QUERYResult } from '@/sanity/types';

const Page = async () => {
  const [page, siteSettings, events] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getAllEvents(),
  ]);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        heroImage={page.heroImage}
        heroTitle={page.heroTitle}
        heroSubtitle={page.heroSubtitle}
        enableHeroCallToAction={page.enableHeroCallToAction}
        heroCallToAction={page.heroCallToAction}
        heroContentPosition={page.heroContentPosition}
        documentId={page._id}
        documentType={page._type}
      />

      {/* Additional Page Builder Content */}
      {page.content && (
        <PageBuilder
          content={page.content as NonNullable<PAGE_QUERYResult>['content']}
          documentId={page._id}
          documentType={page._type}
          siteSettings={siteSettings ? { companyEmail: siteSettings.companyEmail || undefined } : undefined}
          events={events}
        />
      )}
    </>
  );
};

export default Page;
