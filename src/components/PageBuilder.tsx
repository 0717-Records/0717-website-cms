'use client';

import React from 'react';
import type { PAGE_QUERYResult, EVENTS_QUERYResult, COLLABS_ALL_QUERYResult } from '@/sanity/types';
import type { NestedBlock } from '@/types/blocks';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react';
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
import CTAEmailButtonComponent from './blocks/CTAEmailButton';
import CTAEvent from './blocks/CTAEvent';
import CardGrid from './blocks/CardGrid';
import Icon from './blocks/Icon';
import ImageBlock from './blocks/Image';
import ImageGallery from './blocks/ImageGallery';
import YouTubeVideo from './blocks/YouTubeVideo';
import SpotifyWidget from './blocks/SpotifyWidget';
import BandcampWidget from './blocks/BandcampWidget';
import EventBlock from './Events/EventBlock';
import CollabAllBlock from './Collab/CollabAllBlock';
import Divider from './UI/Divider';

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>['content'];
  documentId: string;
  documentType: string;
  pathPrefix?: string;
  siteSettings?: {
    companyEmail?: string;
  };
  events?: EVENTS_QUERYResult;
  collabs?: COLLABS_ALL_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
};

type BlockRendererProps = {
  blocks: NestedBlock[];
  documentId: string;
  documentType: string;
  pathPrefix: string;
  nestingLevel?: number;
  siteSettings?: {
    companyEmail?: string;
  };
  events?: EVENTS_QUERYResult;
  collabs?: COLLABS_ALL_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : '',
};

// Universal block renderer that can handle any block type at any nesting level
const BlockRenderer = ({
  blocks,
  documentId,
  documentType,
  pathPrefix,
  nestingLevel = 1,
  siteSettings,
  events,
  collabs,
  alignment = 'center',
}: BlockRendererProps) => {
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
          const nextBlockIsSection =
            nextBlock &&
            (nextBlock._type === 'pageSection' ||
              nextBlock._type === 'subSection' ||
              nextBlock._type === 'subSubSection');

          // Apply spacing logic:
          // - Regular blocks get mb-6 unless they're the last block
          // - If the next block is a section, add extra margin (mb-12 instead of mb-6)
          let marginClass = '';
          if (!isLastBlock) {
            marginClass = nextBlockIsSection ? 'mb-12' : 'mb-6';
          }

          // Apply alignment for non-section components
          const isSectionType =
            block._type === 'pageSection' ||
            block._type === 'subSection' ||
            block._type === 'subSubSection';

          let alignmentClass = '';
          if (!isSectionType) {
            const alignmentMap = {
              left: 'text-left',
              center: 'text-center',
              right: 'text-right',
            };
            alignmentClass = alignmentMap[alignment] || 'text-center';
          }

          const combinedClasses = [marginClass, alignmentClass].filter(Boolean).join(' ');

          return (
            <div
              className={combinedClasses}
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
              siteSettings={siteSettings}
              events={events}
              collabs={collabs}
              alignment={alignment}
            />
          );
        };

        // IMPORTANT: All block types should be wrapped in BlockWrapper to enable Sanity Live Editing.
        // BlockWrapper provides the necessary data-sanity attributes for visual editing in Sanity Studio.
        // Only skip BlockWrapper if the block component handles its own Sanity data attributes internally.
        switch (block._type) {
          case 'pageSection':
            // Check if this is the first PageSection in the entire blocks array
            const isFirstPageSection = blocks.findIndex((b) => b._type === 'pageSection') === index;
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
                <RichText {...block} alignment={alignment} />
              </BlockWrapper>
            );

          case 'quote':
            return (
              <BlockWrapper key={block._key}>
                <Quote {...block} alignment={alignment} />
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
                <CTACard {...block} email={siteSettings?.companyEmail} />
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

          case 'ctaEmailButton':
            return (
              <BlockWrapper key={block._key}>
                <CTAEmailButtonComponent
                  {...block}
                  email={siteSettings?.companyEmail || 'noemailexists@noemail.com'}
                />
              </BlockWrapper>
            );

          case 'ctaEvent':
            return (
              <BlockWrapper key={block._key}>
                <CTAEvent {...block} />
              </BlockWrapper>
            );

          case 'cardGrid':
            return (
              <BlockWrapper key={block._key}>
                <CardGrid {...block} email={siteSettings?.companyEmail} />
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
                <YouTubeVideo {...block} />
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

          case 'eventBlock':
            return (
              <BlockWrapper key={block._key}>
                <EventBlock maxEvents={block.maxEvents} events={events || []} />
              </BlockWrapper>
            );

          case 'collabAllBlock':
            return (
              <BlockWrapper key={block._key}>
                <CollabAllBlock 
                  ctaText={block.ctaText || 'View Details'} 
                  noCollabsMessage={block.noCollabsMessage || 'No collaborations available at the moment. Check back soon!'}
                  collabs={collabs || []} 
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
  siteSettings,
  events,
  collabs,
  alignment = 'center',
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
        siteSettings={siteSettings}
        events={events}
        collabs={collabs}
        alignment={alignment}
      />
    </div>
  );
};

export default PageBuilder;
