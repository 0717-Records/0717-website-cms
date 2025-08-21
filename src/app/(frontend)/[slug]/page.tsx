import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { getPageBySlug, getSiteSettings } from '@/actions';
import { getAllEvents } from '@/actions/events';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [page, siteSettings, events] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
    getAllEvents(),
  ]);

  return page?.content ? (
    <PageBuilder 
      content={page.content} 
      documentId={page._id} 
      documentType={page._type} 
      siteSettings={siteSettings ? { companyEmail: siteSettings.companyEmail || undefined } : undefined}
      events={events}
    />
  ) : null;
};

export default Page;
