import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import Hero from '@/components/HomeHero/Hero';
import { getHomePage } from '@/actions';
import type { PAGE_QUERYResult } from '@/sanity/types';

const Page = async () => {
  const page = await getHomePage();

  console.log('HOME PAGE DATA:');
  console.log('Full page object:', page);
  console.log('Content field:', page?.content);
  console.log('Hero title:', page?.heroTitle);
  console.log('Hero subtitle:', page?.heroSubtitle);
  console.log('Hero image:', page?.heroImage);
  console.log('Hero CTA:', page?.heroCallToAction);

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
        heroCallToAction={page.heroCallToAction}
        heroContentPosition={page.heroContentPosition}
      />

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
