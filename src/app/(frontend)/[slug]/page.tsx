import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { getPageBySlug } from '@/actions';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return page?.content ? (
    <PageBuilder content={page.content} documentId={page._id} documentType={page._type} />
  ) : null;
};

export default Page;
