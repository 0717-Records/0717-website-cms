import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import NotFoundGraphic from '@/components/UI/Graphics/NotFoundGraphic';
import CTA from '@/components/UI/CTA';

export const metadata: Metadata = {
  title: 'Page Not Found - 07:17 Records',
  description:
    'Sorry, the page you are looking for could not be found. Explore our music releases, events, blog posts, and artist collaborations at 07:17 Records.',
  robots: 'noindex, nofollow', // Don't index 404 pages
  openGraph: {
    title: 'Page Not Found - 07:17 Records',
    description:
      'Sorry, the page you are looking for could not be found. Explore our music releases, events, blog posts, and artist collaborations.',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title='Page Not Found'
        heroImage='/images/hero-bg/hero-bg-option3-2.webp'
        showBreadcrumb={true}
        breadcrumbPageTitle='Page Not Found'
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
            <p className='text-body-lg md:text-body-xl text-gray-600 leading-relaxed mb-6'>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Don&apos;t
              worry though - there&apos;s plenty to explore at 07:17 Records!
            </p>
          </div>

          {/* Helpful Navigation Links */}
          <div className='w-full max-w-4xl mb-12'>
            <h3 className='text-h4 mb-6 text-gray-800'>
              Here are some popular pages to get you back on track:
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
              {/* Popular navigation links */}
              <Link
                href='/'
                className='group bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-primary hover:shadow-md transition-all duration-200'>
                <div className='text-body-base font-medium text-gray-800 group-hover:text-brand-secondary mb-2'>
                  🏠 Home
                </div>
                <div className='text-body-sm text-gray-600'>
                  Discover our latest news and featured content
                </div>
              </Link>

              <Link
                href='/blog'
                className='group bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-primary hover:shadow-md transition-all duration-200'>
                <div className='text-body-base font-medium text-gray-800 group-hover:text-brand-secondary mb-2'>
                  📝 Blog
                </div>
                <div className='text-body-sm text-gray-600'>
                  Read our latest news, stories, and insights
                </div>
              </Link>

              <Link
                href='/events'
                className='group bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-primary hover:shadow-md transition-all duration-200'>
                <div className='text-body-base font-medium text-gray-800 group-hover:text-brand-secondary mb-2'>
                  🎵 Events
                </div>
                <div className='text-body-sm text-gray-600'>
                  Find upcoming and past shows, concerts, and music events
                </div>
              </Link>

              <Link
                href='/#collaborations'
                className='group bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-primary hover:shadow-md transition-all duration-200'>
                <div className='text-body-base font-medium text-gray-800 group-hover:text-brand-secondary mb-2'>
                  🤝 Collaborations
                </div>
                <div className='text-body-sm text-gray-600'>
                  Explore our partnerships and projects
                </div>
              </Link>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className='flex justify-center'>
            <CTA href='/' variant='filled' className='text-body-lg'>
              Take Me Home
            </CTA>
          </div>
        </div>
      </Container>
    </>
  );
}
