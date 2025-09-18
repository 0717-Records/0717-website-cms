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

        {/* Critical CSS inline for faster LCP - Simplified for maintainability */}
        {/*
          ⚠️  IMPORTANT: Only essential layout styles are duplicated from src/app/globals.css
          ⚠️  When changing these critical values, update BOTH:
          ⚠️  1. This inline critical CSS (for performance)
          ⚠️  2. The corresponding styles in src/app/globals.css (for consistency)
          ⚠️
          ⚠️  DUPLICATED STYLES: header positioning, main padding, scroll padding, brand colors
        */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical layout-only styles - KEEP IN SYNC with globals.css */
            html {
              scroll-padding-top: 4.5rem; /* Mobile: matches h-18 */
            }

            @media (min-width: 768px) {
              html {
                scroll-padding-top: 5rem; /* Desktop: matches h-20 */
              }
            }

            body { margin: 0; padding: 0; }

            /* Essential brand colors for immediate render */
            :root {
              --color-brand-primary: #ffea00;
              --color-brand-secondary: #f4a300;
            }

            /*
              ⚠️ HEADER HEIGHT SYNC: These values MUST match:
              - src/components/Header/Header.tsx (h-18 md:h-20)
              - src/components/HomeHero/styles.module.css (hero-height calc values)
              - src/app/globals.css (scroll-padding-top)
            */
            main {
              padding-top: 4.5rem; /* Mobile: matches h-18 */
            }

            @media (min-width: 768px) {
              main {
                padding-top: 5rem; /* Desktop: matches h-20 */
              }
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
