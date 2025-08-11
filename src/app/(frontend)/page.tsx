import React from 'react';
import PageBuilder from '@/components/PageBuilder';
import { getHomePage } from '@/actions';
import type { PAGE_QUERYResult } from '@/sanity/types';

const Page = async () => {
  const page = await getHomePage();

  return page?.content ? (
    <PageBuilder
      content={page.content as NonNullable<PAGE_QUERYResult>['content']}
      documentId={page._id}
      documentType={page._type}
    />
  ) : (
    <></>
  );
};

export default Page;
