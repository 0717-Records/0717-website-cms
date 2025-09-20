import React from 'react';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import { getPrivacyPolicy, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  getOrganizationDataFromSiteSettings,
  generateStructuredDataScript
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';

export async function generateMetadata() {
  const [siteSettings, privacyData] = await Promise.all([
    getSiteSettings(),
    getPrivacyPolicy(),
  ]);

  if (!siteSettings) {
    return {
      title: 'Privacy Policy | 07:17 Records',
      description: 'Privacy policy for our website and how we handle your data',
    };
  }

  const title = privacyData?.title || 'Privacy Policy';

  return generatePageMetadata({
    title,
    description: siteSettings.siteDescription || 'Privacy policy for our website and how we handle your data',
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/privacy-policy'),
  });
}

const PrivacyPolicyPage = async () => {
  const [privacyData, siteSettings, events, collabs, favourites, companyLinks] = await Promise.all([
    getPrivacyPolicy(),
    getSiteSettings(),
    getAllEvents(),
    getCollabs(),
    getFavourites(),
    getCompanyLinks(),
  ]);

  // If the page is hidden or doesn't exist, show 404
  if (!privacyData || privacyData.hide) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: privacyData.title || 'Privacy Policy', url: `${baseUrl}/privacy-policy` },
  ];

  // Generate Article structured data
  let articleSchema;
  if (siteSettings && privacyData._updatedAt) {
    const organizationData = getOrganizationDataFromSiteSettings(siteSettings, baseUrl);

    articleSchema = generateArticleSchema({
      headline: privacyData.title || 'Privacy Policy',
      description: siteSettings.siteDescription || undefined,
      datePublished: privacyData._updatedAt,
      dateModified: privacyData._updatedAt,
      author: {
        name: siteSettings.siteTitle || '07:17 Records',
        type: 'Organization',
      },
      publisher: organizationData,
      url: `${baseUrl}/privacy-policy`,
    });
  }

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {articleSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={generateStructuredDataScript(articleSchema)}
        />
      )}

      {/* Page Hero */}
      <PageHero
        title={privacyData.title || 'Privacy Policy'}
        heroImage='/images/hero-bg/hero-bg-option2.webp'
        documentId={privacyData._id}
        documentType={privacyData._type}
        showBreadcrumb={true}
        breadcrumbPageTitle={privacyData.title || 'Privacy Policy'}
      />

      <Container>
        {/* Page Content */}
        {privacyData.content && (
          <PageBuilder
            content={privacyData.content}
            documentId={privacyData._id}
            documentType={privacyData._type}
            siteSettings={
              siteSettings
                ? {
                    companyEmail: siteSettings.companyEmail || undefined,
                  }
                : undefined
            }
            events={events}
            collabs={collabs}
            favourites={favourites}
            companyLinks={companyLinks}
          />
        )}
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;