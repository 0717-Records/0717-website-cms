import React from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/sanity/lib/live';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import DisableDraftMode from '@/components/DisableDraftMode';
import { Signika } from 'next/font/google';
import { getHeader, getFooter, getSiteSettings } from '@/actions';
import { SiteDataProvider } from '@/contexts/SiteDataContext';

const signika = Signika({ subsets: ['latin'] });

const FrontendLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const headerData = await getHeader();
  const footerData = await getFooter();
  const siteSettingsData = await getSiteSettings();

  return (
    <SiteDataProvider companyEmail={siteSettingsData?.companyEmail || undefined}>
      <div className={`min-h-screen flex flex-col ${signika.className} font-variant-small-caps`}>
        <Header headerData={headerData} />
        <main id="main-content" className='flex-1'>{children}</main>
        <Footer 
          footerData={footerData} 
          siteSettingsData={siteSettingsData} 
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
  );
};

export default FrontendLayout;
