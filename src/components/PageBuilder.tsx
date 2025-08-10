'use client';

import React from 'react';
import type { PAGE_QUERYResult } from '@/sanity/types';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react'; // Changed this import
import Hero from './blocks/Hero';
import Features from './blocks/Features';
import SplitImage from './blocks/SplitImage';
import FAQs from './blocks/FAQs';

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>['content'];
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

const PageBuilder = ({ content, documentId, documentType }: PageBuilderProps) => {
  const [blocks] = useOptimistic<NonNullable<PAGE_QUERYResult>['content']>(content);

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: 'content',
      }).toString()}>
      {blocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `content[_key=="${block._key}"]`,
            }).toString()}>
            {children}
          </div>
        );

        switch (block._type) {
          case 'hero':
            return (
              <DragHandle key={block._key}>
                <Hero {...block} />
              </DragHandle>
            );
          case 'features':
            return (
              <DragHandle key={block._key}>
                <Features {...block} />
              </DragHandle>
            );
          case 'splitImage':
            return (
              <DragHandle key={block._key}>
                <SplitImage {...block} />
              </DragHandle>
            );
          case 'faqs':
            return (
              <DragHandle key={block._key}>
                <FAQs {...block} />
              </DragHandle>
            );
          default:
            // This is a fallback for when we don't have a block type
            return <div>Block not found</div>;
        }
      })}
    </main>
  );
};

export default PageBuilder;
