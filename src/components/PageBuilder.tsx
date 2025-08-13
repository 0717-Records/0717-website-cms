'use client';

import React from 'react';
import type { PAGE_QUERYResult } from '@/sanity/types';
import type { NestedBlock } from '@/types/blocks';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react';
import Section from './Section';
import SplitImage from './blocks/SplitImage';
import Divider from './UI/Divider';

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>['content'];
  documentId: string;
  documentType: string;
  pathPrefix?: string;
};

type BlockRendererProps = {
  blocks: NestedBlock[];
  documentId: string;
  documentType: string;
  pathPrefix: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

// Universal block renderer that can handle any block type at any nesting level
const BlockRenderer = ({ blocks, documentId, documentType, pathPrefix }: BlockRendererProps) => {
  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const blockPath = `${pathPrefix}[_key=="${block._key}"]`;

        const BlockWrapper = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: blockPath,
            }).toString()}>
            {children}
          </div>
        );

        // Handle nested content for blocks that support it
        const renderNestedContent = (nestedBlocks?: NestedBlock[]) => {
          if (!nestedBlocks || !Array.isArray(nestedBlocks)) {
            return null;
          }
          return (
            <BlockRenderer
              blocks={nestedBlocks}
              documentId={documentId}
              documentType={documentType}
              pathPrefix={`${blockPath}.content`}
            />
          );
        };

        switch (block._type) {
          case 'section':
            return (
              <BlockWrapper key={block._key}>
                <Section
                  title={block.title}
                  subtitle={block.subtitle}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  subtitlePath={`${blockPath}.subtitle`}>
                  {renderNestedContent(block.content)}
                </Section>
              </BlockWrapper>
            );

          case 'splitImage':
            return (
              <BlockWrapper key={block._key}>
                {/* @ts-expect-error - Temporary fix while we restructure types */}
                <SplitImage {...block} />
              </BlockWrapper>
            );

          // Future blocks that can contain nested content
          case 'hero':
            return (
              <BlockWrapper key={block._key}>
                <div className='hero-block'>
                  {/* Hero component will go here */}
                  <div>Hero Block</div>
                  {renderNestedContent(block.content)}
                </div>
              </BlockWrapper>
            );

          case 'feature':
            return (
              <BlockWrapper key={block._key}>
                <div className='feature-block'>
                  {/* Feature component will go here */}
                  <div>Feature Block</div>
                  {renderNestedContent(block.content)}
                </div>
              </BlockWrapper>
            );

          case 'divider':
            return (
              <BlockWrapper key={block._key}>
                <Divider />
              </BlockWrapper>
            );

          default: {
            // Handle unknown block types gracefully
            const unknownBlock = block as { _key: string; _type: string };
            return (
              <BlockWrapper key={unknownBlock._key}>
                <div>Block type &quot;{unknownBlock._type}&quot; not found</div>
              </BlockWrapper>
            );
          }
        }
      })}
    </>
  );
};

const PageBuilder = ({
  content,
  documentId,
  documentType,
  pathPrefix = 'content',
}: PageBuilderProps) => {
  const [sections] = useOptimistic<NonNullable<PAGE_QUERYResult>['content']>(content);

  if (!Array.isArray(sections)) {
    return null;
  }

  return (
    <div
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: pathPrefix,
      }).toString()}>
      <BlockRenderer
        blocks={sections as NestedBlock[]}
        documentId={documentId}
        documentType={documentType}
        pathPrefix={pathPrefix}
      />
    </div>
  );
};

export default PageBuilder;
