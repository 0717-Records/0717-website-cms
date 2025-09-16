import React from 'react';
import { Signika } from 'next/font/google';
import '@/app/globals.css';

const signika = Signika({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Basic organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '07:17 Records',
    url: baseUrl,
    description: 'Thank You For Creating',
  };

  return (
    <html lang='en'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!isProd && <meta name='robots' content='noindex, nofollow' />}

        {/* Resource hints for performance */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />

        {/* Critical CSS inline for faster LCP */}
        {/*
          ⚠️  IMPORTANT: These styles are duplicated from src/app/globals.css
          ⚠️  When changing brand colors, typography, or layout styles, update BOTH:
          ⚠️  1. This inline critical CSS (for performance)
          ⚠️  2. The corresponding styles in src/app/globals.css (for consistency)
        */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles - KEEP IN SYNC with globals.css */
            html { scroll-padding-top: 6rem; }
            body { margin: 0; padding: 0; }

            /* Essential layout styles */
            .bg-gray-50 { background-color: #f9fafb; }

            /* Critical brand colors for immediate visibility */
            :root {
              --color-brand-primary: #ffea00;
              --color-brand-secondary: #f4a300;
              --color-text-subtle: #606774;
            }

            /* Essential typography for LCP */
            .text-body-base {
              font-size: 1.125rem;
              line-height: 1.75;
            }

            /* Critical header positioning to prevent layout shift */
            header {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 50;
              background-color: white;
              border-bottom: 1px solid #e5e7eb;
            }

            /* Prevent FOUC */
            main {
              padding-top: 6rem;
              min-height: 100vh;
            }

            /* Critical button and interactive styles */
            .btn-primary {
              background-color: var(--color-brand-primary);
              color: #000;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 500;
              transition: background-color 0.2s ease;
            }

            .btn-primary:hover {
              background-color: var(--color-brand-secondary);
            }
          `
        }} />

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${signika.className} text-body-base bg-gray-50`}>{children}</body>
    </html>
  );
};

export default RootLayout;
