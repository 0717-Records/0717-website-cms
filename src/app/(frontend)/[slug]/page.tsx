import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { getPageBySlug, getSiteSettings } from '@/actions';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [page, siteSettings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ]);

  return page?.content ? (
    <PageBuilder 
      content={page.content} 
      documentId={page._id} 
      documentType={page._type} 
      siteSettings={siteSettings ? { companyEmail: siteSettings.companyEmail || undefined } : undefined}
    />
  ) : null;
};

export default Page;
