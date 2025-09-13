import React from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DisableDraftMode from '@/components/DisableDraftMode';
import NavigationScroll from '@/components/NavigationScroll';
import PageReadyTrigger from '@/components/PageReadyTrigger';
import { Signika } from 'next/font/google';
import { getHeader, getFooter, getSiteSettings, getCompanyLinks } from '@/actions';
import { SiteDataProvider } from '@/contexts/SiteDataContext';
import { PageLoadProvider } from '@/contexts/PageLoadContext';
import { generateMetadata as generateDefaultMetadata } from '@/lib/metadata';

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

  return (
    <PageLoadProvider>
      <SiteDataProvider companyEmail={siteSettingsData?.companyEmail || undefined}>
        <NavigationScroll />
        <PageReadyTrigger />
        <div className={`min-h-screen flex flex-col ${signika.className} font-variant-small-caps`}>
          <Header headerData={headerData} />
          <main id='main-content' className='flex-1'>
            {children}
          </main>
          <Footer
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
