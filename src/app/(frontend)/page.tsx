import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { getHomePage } from '@/actions';

const Page = async () => {
  const page = await getHomePage();

  return page?.content ? (
    <PageBuilder content={page.content} documentId={page._id} documentType={page._type} />
  ) : (
    <></>
  );
};

export default Page;
