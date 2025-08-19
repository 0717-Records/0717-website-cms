'use client';

import React from 'react';
import type { PAGE_QUERYResult } from '@/sanity/types';
import type { NestedBlock } from '@/types/blocks';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react';
import Section from './Layout/Section';
import PageSection from './Layout/PageSection';
import SubSection from './Layout/SubSection';
import SubSubSection from './Layout/SubSubSection';
import ItemList from './blocks/ItemList';
import RichText from './blocks/RichText';
import Quote from './blocks/Quote';
import TextImage from './blocks/TextImage';
import CTACard from './blocks/CTACard';
import CTAButton from './blocks/CTAButton';
import CTACalloutLinkComponent from './blocks/CTACalloutLink';
import CardGrid from './blocks/CardGrid';
import Icon from './blocks/Icon';
import ImageBlock from './blocks/Image';
import ImageGallery from './blocks/ImageGallery';
import YouTubeVideo from './blocks/YouTubeVideo';
import SpotifyWidget from './blocks/SpotifyWidget';
import BandcampWidget from './blocks/BandcampWidget';
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
  nestingLevel?: number;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

// Universal block renderer that can handle any block type at any nesting level
const BlockRenderer = ({ blocks, documentId, documentType, pathPrefix, nestingLevel = 1 }: BlockRendererProps) => {
  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockPath = `${pathPrefix}[_key=="${block._key}"]`;
        const isLastBlock = index === blocks.length - 1;

        const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
          // Check if the next block is a section type that needs extra spacing
          const nextBlock = blocks[index + 1];
          const nextBlockIsSection = nextBlock && (
            nextBlock._type === 'pageSection' || 
            nextBlock._type === 'subSection' || 
            nextBlock._type === 'subSubSection' || 
            nextBlock._type === 'section'
          );
          
          // Apply spacing logic:
          // - Regular blocks get mb-6 unless they're the last block
          // - If the next block is a section, add extra margin (mb-12 instead of mb-6)
          // - If this is the first block and NOT a PageSection at top level, add top padding
          let marginClass = '';
          if (!isLastBlock) {
            marginClass = nextBlockIsSection ? 'mb-12' : 'mb-6';
          }
          
          // Add top padding for first non-PageSection block at top level (main content)
          const isFirstBlock = index === 0;
          const isTopLevel = nestingLevel === 1;
          const isNotPageSection = block._type !== 'pageSection';
          const needsTopPadding = isFirstBlock && isTopLevel && isNotPageSection;
          
          if (needsTopPadding) {
            marginClass = `pt-16 md:pt-24 ${marginClass}`.trim();
          }
          
          return (
            <div
              className={marginClass}
              data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path: blockPath,
              }).toString()}>
              {children}
            </div>
          );
        };

        // Handle nested content for blocks that support it
        const renderNestedContent = (nestedBlocks?: unknown[]) => {
          if (!nestedBlocks || !Array.isArray(nestedBlocks)) {
            return null;
          }
          return (
            <BlockRenderer
              blocks={nestedBlocks as NestedBlock[]}
              documentId={documentId}
              documentType={documentType}
              pathPrefix={`${blockPath}.content`}
              nestingLevel={nestingLevel + 1}
            />
          );
        };

        // IMPORTANT: All block types should be wrapped in BlockWrapper to enable Sanity Live Editing.
        // BlockWrapper provides the necessary data-sanity attributes for visual editing in Sanity Studio.
        // Only skip BlockWrapper if the block component handles its own Sanity data attributes internally.
        switch (block._type) {
          case 'pageSection':
            // Check if this is the first PageSection in the entire blocks array
            const isFirstPageSection = blocks.findIndex(b => b._type === 'pageSection') === index;
            return (
              <BlockWrapper key={block._key}>
                <PageSection
                  title={block.title!} // Required field
                  subtitle={block.subtitle}
                  textAlign={block.textAlign}
                  isFirst={isFirstPageSection}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  subtitlePath={`${blockPath}.subtitle`}>
                  {renderNestedContent(block.content)}
                </PageSection>
              </BlockWrapper>
            );

          case 'subSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSection
                  title={block.title!} // Required field
                  textAlign={block.textAlign}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}>
                  {renderNestedContent(block.content)}
                </SubSection>
              </BlockWrapper>
            );

          case 'subSubSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSubSection
                  title={block.title!} // Required field
                  textAlign={block.textAlign}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}>
                  {renderNestedContent(block.content)}
                </SubSubSection>
              </BlockWrapper>
            );

          case 'section':
            return (
              <BlockWrapper key={block._key}>
                <Section
                  title={block.title}
                  textAlign={block.textAlign}
                  nestingLevel={nestingLevel}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}>
                  {renderNestedContent(block.content)}
                </Section>
              </BlockWrapper>
            );

          case 'divider':
            return (
              <BlockWrapper key={block._key}>
                <Divider />
              </BlockWrapper>
            );

          case 'itemList':
            return (
              <BlockWrapper key={block._key}>
                <ItemList {...block} />
              </BlockWrapper>
            );


          case 'richText':
            return (
              <BlockWrapper key={block._key}>
                <RichText {...block} />
              </BlockWrapper>
            );

          case 'quote':
            return (
              <BlockWrapper key={block._key}>
                <Quote {...block} />
              </BlockWrapper>
            );

          case 'textImage':
            return (
              <BlockWrapper key={block._key}>
                <TextImage 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          case 'ctaCard':
            return (
              <BlockWrapper key={block._key}>
                <CTACard {...block} />
              </BlockWrapper>
            );

          case 'ctaButton':
            return (
              <BlockWrapper key={block._key}>
                <CTAButton {...block} />
              </BlockWrapper>
            );

          case 'ctaCalloutLink':
            return (
              <BlockWrapper key={block._key}>
                <CTACalloutLinkComponent {...block} />
              </BlockWrapper>
            );

          case 'cardGrid':
            return (
              <BlockWrapper key={block._key}>
                <CardGrid {...block} />
              </BlockWrapper>
            );

          case 'icon':
            return (
              <BlockWrapper key={block._key}>
                <Icon {...block} />
              </BlockWrapper>
            );

          case 'imageBlock':
            return (
              <BlockWrapper key={block._key}>
                <ImageBlock 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          case 'imageGallery':
            return (
              <BlockWrapper key={block._key}>
                <ImageGallery 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          case 'youTubeVideo':
            return (
              <BlockWrapper key={block._key}>
                <YouTubeVideo 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          case 'spotifyWidget':
            return (
              <BlockWrapper key={block._key}>
                <SpotifyWidget 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
              </BlockWrapper>
            );

          case 'bandcampWidget':
            return (
              <BlockWrapper key={block._key}>
                <BandcampWidget 
                  {...block} 
                  documentId={documentId}
                  documentType={documentType}
                  pathPrefix={blockPath}
                />
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
