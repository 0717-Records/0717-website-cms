import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage } from '@/actions';
import type { PAGE_QUERYResult } from '@/sanity/types';
import CTACalloutLinkExamples from '@/components/UI/CTACalloutLink.example';

const Page = async () => {
  const page = await getHomePage();

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

      <CTACalloutLinkExamples />

      {/* Additional Page Builder Content */}
      {page.content && (
        <PageBuilder
          content={page.content as NonNullable<PAGE_QUERYResult>['content']}
          documentId={page._id}
          documentType={page._type}
        />
      )}
    </>
  );
};

export default Page;
