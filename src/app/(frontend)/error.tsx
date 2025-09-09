'use client';

import React from 'react';
import PageHero from '@/components/Page/PageHero';
import Container from '@/components/Layout/Container';
import ErrorGraphic from '@/components/UI/Graphics/ErrorGraphic';
import CTA from '@/components/UI/CTA';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title='Something Went Wrong'
        heroImage='/images/hero-bg/hero-bg-option3-2.webp'
        hideBackLink={true}
      />

      <Container>
        <div className='flex flex-col items-center text-center pb-12 md:pb-16'>
          {/* Graphic */}
          <div className='w-full max-w-[200px] sm:max-w-[300px] mb-8 md:mb-12'>
            <ErrorGraphic className='w-full' />
          </div>

          {/* Message */}
          <div className='max-w-2xl mb-8 md:mb-12'>
            <h2 className='text-h3 md:text-h2 mb-4'>Sorry, something went wrong</h2>
            <p className='text-body-lg md:text-body-xl text-gray-600 leading-relaxed mb-6'>
              We encountered an unexpected error while processing your request. This could be a
              temporary issue with our services. Please try again, or contact an admin if the
              problem persists.
            </p>

            {/* Error details for development (hidden in production) */}
            {process.env.NODE_ENV === 'development' && (
              <details className='mt-4 p-4 bg-gray-100 rounded-lg text-left max-w-lg'>
                <summary className='cursor-pointer text-body-sm font-medium text-gray-700 mb-2'>
                  Error Details (Development Only)
                </summary>
                <pre className='text-body-xs text-gray-600 whitespace-pre-wrap break-words'>
                  {error.message}
                  {error.digest && `\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <CTA href='/' variant='filled' className='text-body-lg'>
            Go to Home Page
          </CTA>
        </div>
      </Container>
    </>
  );
}
