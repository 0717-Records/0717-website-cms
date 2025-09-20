import React from 'react';
import { notFound } from 'next/navigation';
import PageBuilder from '@/components/PageBuilder';
import PageHero from '@/components/Page/PageHero';
import { getTermsAndConditions, getSiteSettings, getCompanyLinks } from '@/actions';
import { getAllEvents } from '@/actions/events';
import { getCollabs } from '@/actions/collabs';
import { getFavourites } from '@/actions/favourites';
import Container from '@/components/Layout/Container';
import { generateMetadata as generatePageMetadata, generateCanonicalUrl } from '@/lib/metadata';
import {
  generateArticleSchema,
  getOrganizationDataFromSiteSettings,
  generateStructuredDataScript,
} from '@/lib/structuredData';
import BreadcrumbStructuredData from '@/components/StructuredData/BreadcrumbStructuredData';

export async function generateMetadata() {
  const [siteSettings, termsData] = await Promise.all([getSiteSettings(), getTermsAndConditions()]);

  if (!siteSettings) {
    return {
      title: 'Terms & Conditions | 07:17 Records',
      description: 'Terms and conditions for using our website and services',
    };
  }

  const title = termsData?.title || 'Terms & Conditions';

  return generatePageMetadata({
    title,
    description:
      siteSettings.siteDescription || 'Terms and conditions for using our website and services',
    siteSettings,
    canonicalUrl: generateCanonicalUrl('/terms-and-conditions'),
  });
}

const TermsAndConditionsPage = async () => {
  const [termsData, siteSettings, events, collabs, favourites, companyLinks] = await Promise.all([
    getTermsAndConditions(),
    getSiteSettings(),
    getAllEvents(),
    getCollabs(),
    getFavourites(),
    getCompanyLinks(),
  ]);

  // If the page is hidden or doesn't exist, show 404
  if (!termsData || termsData.hide) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://0717records.com';

  // Generate breadcrumb data
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: termsData.title || 'Terms & Conditions', url: `${baseUrl}/terms-and-conditions` },
  ];

  // Generate Article structured data
  let articleSchema;
  if (siteSettings && termsData._updatedAt) {
    const organizationData = getOrganizationDataFromSiteSettings(siteSettings, baseUrl);

    articleSchema = generateArticleSchema({
      headline: termsData.title || 'Terms & Conditions',
      description: siteSettings.siteDescription || undefined,
      datePublished: termsData._updatedAt,
      dateModified: termsData._updatedAt,
      author: {
        name: siteSettings.siteTitle || '07:17 Records',
        type: 'Organization',
      },
      publisher: organizationData,
      url: `${baseUrl}/terms-and-conditions`,
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
        title={termsData.title || 'Terms & Conditions'}
        heroImage='/images/hero-bg/hero-bg-option2.webp'
        documentId={termsData._id}
        documentType={termsData._type}
        showBreadcrumb={true}
        breadcrumbPageTitle={termsData.title || 'Terms & Conditions'}
      />

      <Container textAlign='left'>
        {/* Page Content */}
        {termsData.content && (
          <PageBuilder
            content={termsData.content}
            documentId={termsData._id}
            documentType={termsData._type}
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
            alignment='left'
          />
        )}
      </Container>
    </>
  );
};

export default TermsAndConditionsPage;
