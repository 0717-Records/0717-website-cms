import React from 'react';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import NotFoundGraphic from '@/components/UI/Graphics/NotFoundGraphic';
import CTA from '@/components/UI/CTA';

export default function NotFound() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title='Page Not Found'
        heroImage='/images/hero-bg/hero-bg-option3-2.webp'
        showBreadcrumb={true}
        breadcrumbPageTitle="Page Not Found"
      />

      <Container>
        <div className='flex flex-col items-center text-center pb-12 md:pb-16'>
          {/* Graphic */}
          <div className='w-full max-w-[200px] sm:max-w-[300px] mb-8 md:mb-12'>
            <NotFoundGraphic className='w-full' />
          </div>

          {/* Message */}
          <div className='max-w-2xl mb-8 md:mb-12'>
            <h2 className='text-h3 md:text-h2 mb-4'>Oops! We can&apos;t find that page</h2>
            <p className='text-body-lg md:text-body-xl text-gray-600 leading-relaxed'>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Please
              check the URL and try again, or head back to our home page to find what you&apos;re
              looking for.
            </p>
          </div>

          {/* CTA Button */}
          <div className='flex justify-center'>
            <CTA href='/' variant='filled' className='text-body-lg'>
              Go to Home Page
            </CTA>
          </div>
        </div>
      </Container>
    </>
  );
}
