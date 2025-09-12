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

const signika = Signika({ subsets: ['latin'] });

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
