'use client';

import React from 'react';
import type {
  PAGE_QUERYResult,
  EVENTS_QUERYResult,
  COLLABS_ALL_QUERYResult,
  FAVOURITES_ALL_QUERYResult,
  COMPANY_LINKS_QUERYResult,
} from '@/sanity/types';
import type { NestedBlock } from '@/types/blocks';
import type { SiteSettingsProps } from '@/types/shared';
import { client } from '@/sanity/lib/client';
import { createDataAttribute } from 'next-sanity';
import { useOptimistic } from 'react';
import { pageSectionTopSpacing, contentBlockBottomSpacing, subSectionTopSpacing } from '@/utils/spacingConstants';
import PageSection from './Layout/PageSection';
import SubSection from './Layout/SubSection';
import SubSubSection from './Layout/SubSubSection';
import ItemList from './blocks/ItemList';
import RichText from './blocks/RichText';
import Quote from './blocks/Quote';
import TextImage from './blocks/TextImage';
import Card from './blocks/Card';
import CTAButton from './blocks/CTAButton';
import CTACalloutLinkComponent from './blocks/CTACalloutLink';
import CTAEmailButtonComponent from './blocks/CTAEmailButton';
import CTAEvent from './blocks/CTAEvent';
import CTABlogPost from './blocks/CTABlogPost';
import CardGrid from './blocks/CardGrid';
import Icon from './blocks/Icon';
import ImageBlock from './blocks/Image';
import ImageGallery from './blocks/ImageGallery';
import YouTubeVideo from './blocks/YouTubeVideo';
import SpotifyWidget from './blocks/SpotifyWidget';
import BandcampWidget from './blocks/BandcampWidget';
import EventBlock from './blocks/EventBlock';
import CollabAllBlock from './blocks/CollabAllBlock';
import FavouriteBlock from './blocks/FavouriteBlock';
import CompanyLinksBlock from './blocks/CompanyLinksBlock';
import Divider from './UI/Divider';

// Shared interface for common props used across PageBuilder components
interface SharedPageBuilderProps {
  documentId: string;
  documentType: string;
  siteSettings?: SiteSettingsProps;
  events?: EVENTS_QUERYResult;
  collabs?: COLLABS_ALL_QUERYResult;
  favourites?: FAVOURITES_ALL_QUERYResult;
  companyLinks?: COMPANY_LINKS_QUERYResult;
  alignment?: 'left' | 'center' | 'right';
}

type PageBuilderProps = SharedPageBuilderProps & {
  content: NonNullable<PAGE_QUERYResult>['content'];
  pathPrefix?: string;
};

type BlockRendererProps = SharedPageBuilderProps & {
  blocks: NestedBlock[];
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
const BlockRenderer = ({
  blocks,
  documentId,
  documentType,
  pathPrefix,
  nestingLevel = 1,
  siteSettings,
  events,
  collabs,
  favourites,
  companyLinks,
  alignment = 'center',
}: BlockRendererProps) => {
  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockPath = `${pathPrefix}[_key=="${block._key}"]`;

        const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
          const isLastBlock = index === blocks.length - 1;
          const hasSiblingBefore = index > 0;
          
          let marginClass = '';
          
          if (block._type === 'pageSection') {
            // SPACE_B: PageSection that comes after orphaned content blocks
            const hasOrphanedContentBefore = blocks
              .slice(0, index)
              .some(prevBlock => 
                prevBlock._type !== 'pageSection' && 
                prevBlock._type !== 'subSection' && 
                prevBlock._type !== 'subSubSection'
              );
            
            if (hasOrphanedContentBefore) {
              marginClass = pageSectionTopSpacing;
            }
          } else if (block._type === 'subSection' || block._type === 'subSubSection') {
            // SPACE_H: SubSection/SubSubSection with sibling before it
            if (hasSiblingBefore) {
              marginClass = subSectionTopSpacing;
            }
          } else {
            // SPACE_G: Content blocks that aren't sections
            // Don't add spacing if this is the last block (PageSection bottom padding handles it)
            if (!isLastBlock) {
              marginClass = contentBlockBottomSpacing;
            }
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
              siteSettings={siteSettings}
              events={events}
              collabs={collabs}
              favourites={favourites}
              companyLinks={companyLinks}
              alignment={alignment}
            />
          );
        };

        // IMPORTANT: All block types should be wrapped in BlockWrapper to enable Sanity Live Editing.
        // BlockWrapper provides the necessary data-sanity attributes for visual editing in Sanity Studio.
        // Only skip BlockWrapper if the block component handles its own Sanity data attributes internally.
        switch (block._type) {
          case 'pageSection':
            return (
              <BlockWrapper key={block._key}>
                <PageSection
                  title={block.title!} // Required field
                  subtitle={block.subtitle}
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  subtitlePath={`${blockPath}.subtitle`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}>
                  {renderNestedContent(block.content)}
                </PageSection>
              </BlockWrapper>
            );

          case 'subSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSection
                  title={block.title!} // Required field
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}>
                  {renderNestedContent(block.content)}
                </SubSection>
              </BlockWrapper>
            );

          case 'subSubSection':
            return (
              <BlockWrapper key={block._key}>
                <SubSubSection
                  title={block.title!} // Required field
                  anchorId={block.anchorId}
                  documentId={documentId}
                  documentType={documentType}
                  titlePath={`${blockPath}.title`}
                  inheritAlignment={alignment}
                  textAlign={(block as { textAlign?: string }).textAlign}>
                  {renderNestedContent(block.content)}
                </SubSubSection>
              </BlockWrapper>
            );

          case 'divider':
            return (
              <BlockWrapper key={block._key}>
                <Divider alignment={alignment} />
              </BlockWrapper>
            );

          case 'itemList':
            return (
              <BlockWrapper key={block._key}>
                <ItemList {...block} inheritAlignment={alignment} />
              </BlockWrapper>
            );

          case 'richText':
            return (
              <BlockWrapper key={block._key}>
                <RichText {...block} inheritAlignment={alignment} />
              </BlockWrapper>
            );

          case 'quote':
            return (
              <BlockWrapper key={block._key}>
                <Quote {...block} inheritAlignment={alignment} />
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

          case 'card':
            return (
              <BlockWrapper key={block._key}>
                <Card {...block} documentId={documentId} documentType={documentType} />
              </BlockWrapper>
            );

          case 'ctaButton':
            return (
              <BlockWrapper key={block._key}>
                <CTAButton {...block} inheritAlignment={alignment} />
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
                <CTAEmailButtonComponent {...block} inheritAlignment={alignment} />
              </BlockWrapper>
            );

          case 'ctaEvent':
            return (
              <BlockWrapper key={block._key}>
                <CTAEvent {...block} />
              </BlockWrapper>
            );

          case 'ctaBlogPost':
            return (
              <BlockWrapper key={block._key}>
                <CTABlogPost {...block} />
              </BlockWrapper>
            );

          case 'cardGrid':
            return (
              <BlockWrapper key={block._key}>
                <CardGrid {...block} documentId={documentId} documentType={documentType} />
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
                  noCollabsMessage={
                    block.noCollabsMessage ||
                    'No collaborations available at the moment. Check back soon!'
                  }
                  collabs={collabs || []}
                />
              </BlockWrapper>
            );

          case 'favouriteBlock':
            return (
              <BlockWrapper key={block._key}>
                <FavouriteBlock favourites={favourites || []} />
              </BlockWrapper>
            );

          case 'companyLinksBlock':
            return (
              <BlockWrapper key={block._key}>
                <CompanyLinksBlock companyLinks={companyLinks?.companyLinks || null} />
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
  favourites,
  companyLinks,
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
        favourites={favourites}
        companyLinks={companyLinks}
        alignment={alignment}
      />
    </div>
  );
};

export default PageBuilder;
