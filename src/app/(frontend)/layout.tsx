import React from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import FooterSwitcher from '@/components/Footer/FooterSwitcher';
import DisableDraftMode from '@/components/DisableDraftMode';
import NavigationScroll from '@/components/NavigationScroll';
import PageReadyTrigger from '@/components/PageReadyTrigger';
import { Signika } from 'next/font/google';
import { getHeader, getFooter, getSiteSettings, getCompanyLinks } from '@/actions';
import { SiteDataProvider } from '@/contexts/SiteDataContext';
import { PageLoadProvider } from '@/contexts/PageLoadContext';
import { generateMetadata as generateDefaultMetadata } from '@/lib/metadata';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  getOrganizationDataFromSiteSettings,
  getWebSiteDataFromSiteSettings,
  generateStructuredDataScript,
} from '@/lib/structuredData';

const signika = Signika({ subsets: ['latin'] });

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  if (!siteSettings) {
    return {
      title: '07:17 Records | Thank You For Creating',
      description: 'Welcome to 07:17 Records',
    };
  }

  return generateDefaultMetadata({
    siteSettings,
    image: siteSettings.defaultOgImage, // Set default OG image at layout level
  });
}

const FrontendLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const headerData = await getHeader();
  const footerData = await getFooter();
  const siteSettingsData = await getSiteSettings();
  const companyLinksData = await getCompanyLinks();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Generate structured data if site settings are available
  let organizationSchema;
  let webSiteSchema;

  if (siteSettingsData) {
    const organizationData = getOrganizationDataFromSiteSettings(siteSettingsData, baseUrl);
    const webSiteData = getWebSiteDataFromSiteSettings(siteSettingsData, baseUrl);

    organizationSchema = generateOrganizationSchema(organizationData);
    webSiteSchema = generateWebSiteSchema(webSiteData);
  }

  return (
    <PageLoadProvider>
      <SiteDataProvider companyEmail={siteSettingsData?.companyEmail || undefined}>
        <NavigationScroll />
        <PageReadyTrigger />

        {/* Structured Data */}
        {organizationSchema && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={generateStructuredDataScript(organizationSchema)}
          />
        )}
        {webSiteSchema && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={generateStructuredDataScript(webSiteSchema)}
          />
        )}

        <div className={`min-h-screen flex flex-col ${signika.className} font-variant-small-caps`}>
          <Header headerData={headerData} />
          <main id='main-content' className='flex-1'>
            {children}
          </main>
          <FooterSwitcher
            footerData={footerData}
            siteSettingsData={siteSettingsData}
            companyLinksData={companyLinksData}
          />
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </div>
      </SiteDataProvider>
    </PageLoadProvider>
  );
};

export default FrontendLayout;
