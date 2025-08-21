// Block types that support unlimited nesting
// This type represents any block that can contain other blocks


import type { ItemList, Divider, RichText, Quote, TextImage, CtaCard, CardGrid, Icon, ImageBlock as SanityImageBlock, ImageGallery, YouTubeVideo, SpotifyWidget, BandcampWidget, PageSection, CtaButton, CtaCalloutLink, CtaEmailButton, EmbeddedCtaButton, CtaEvent, SubSection, SubSubSection, EventBlock } from '@/sanity/types';

export interface BaseBlock {
  _key: string;
  _type: string;
}

export interface SectionBlock extends BaseBlock {
  _type: 'section';
  title?: string;
  subtitle?: string;
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
  content?: NestedBlock[];
}

// Use generated Sanity types for proper typing
// Override generated types to make title required (validation ensures this)
export type PageSectionBlock = Omit<PageSection, 'title'> & { _key: string; title: string };
export type SubSectionBlock = Omit<SubSection, 'title'> & { _key: string; title: string };
export type SubSubSectionBlock = Omit<SubSubSection, 'title'> & { _key: string; title: string };
export type ItemListBlock = ItemList & { _key: string };
export type DividerBlock = Divider & { _key: string };
export type RichTextBlock = RichText & { _key: string };
export type QuoteBlock = Quote & { _key: string };
export type TextImageBlock = TextImage & { _key: string };
export type CTACardBlock = CtaCard & { _key: string };
export type CardGridBlock = CardGrid & { _key: string };
export type IconBlock = Icon & { _key: string };
export type ImageBlock = SanityImageBlock & { _key: string };
export type ImageGalleryBlock = ImageGallery & { _key: string };
export type YouTubeVideoBlock = YouTubeVideo & { _key: string };
export type SpotifyWidgetBlock = SpotifyWidget & { _key: string };
export type BandcampWidgetBlock = BandcampWidget & { _key: string };
export type CTAButtonBlock = CtaButton & { _key: string };
export type CTACalloutLinkBlock = CtaCalloutLink & { _key: string };
export type CTAEmailButtonBlock = CtaEmailButton & { _key: string };
export type EmbeddedCTAButtonBlock = EmbeddedCtaButton & { _key: string };
export type CTAEventBlock = CtaEvent & { _key: string };
export type EventBlockType = EventBlock & { _key: string };

// Union of all possible block types (current and future)
export type NestedBlock =
  | PageSectionBlock
  | SubSectionBlock
  | SubSubSectionBlock
  | SectionBlock
  | DividerBlock
  | ItemListBlock
  | RichTextBlock
  | QuoteBlock
  | TextImageBlock
  | CTACardBlock
  | CardGridBlock
  | IconBlock
  | ImageBlock
  | ImageGalleryBlock
  | YouTubeVideoBlock
  | SpotifyWidgetBlock
  | BandcampWidgetBlock
  | CTAButtonBlock
  | CTACalloutLinkBlock
  | CTAEmailButtonBlock
  | CTAEventBlock
  | EventBlockType;

// Union of blocks that can contain nested content
export type BlockWithContent = PageSectionBlock | SubSectionBlock | SubSubSectionBlock | SectionBlock | CTACardBlock;

// Type guard functions
export const isBlockWithContent = (block: NestedBlock): block is BlockWithContent => {
  return block._type === 'pageSection' || block._type === 'subSection' || block._type === 'subSubSection' || block._type === 'section' || block._type === 'ctaCard';
};

export const isPageSectionBlock = (block: NestedBlock): block is PageSectionBlock => {
  return block._type === 'pageSection';
};

export const isSubSectionBlock = (block: NestedBlock): block is SubSectionBlock => {
  return block._type === 'subSection';
};

export const isSubSubSectionBlock = (block: NestedBlock): block is SubSubSectionBlock => {
  return block._type === 'subSubSection';
};

export const isSectionBlock = (block: NestedBlock): block is SectionBlock => {
  return block._type === 'section';
};

export const isDividerBlock = (block: NestedBlock): block is DividerBlock => {
  return block._type === 'divider';
};

export const isItemListBlock = (block: NestedBlock): block is ItemListBlock => {
  return block._type === 'itemList';
};


export const isRichTextBlock = (block: NestedBlock): block is RichTextBlock => {
  return block._type === 'richText';
};

export const isQuoteBlock = (block: NestedBlock): block is QuoteBlock => {
  return block._type === 'quote';
};

export const isTextImageBlock = (block: NestedBlock): block is TextImageBlock => {
  return block._type === 'textImage';
};

export const isCTACardBlock = (block: NestedBlock): block is CTACardBlock => {
  return block._type === 'ctaCard';
};

export const isCardGridBlock = (block: NestedBlock): block is CardGridBlock => {
  return block._type === 'cardGrid';
};

export const isIconBlock = (block: NestedBlock): block is IconBlock => {
  return block._type === 'icon';
};

export const isImageBlock = (block: NestedBlock): block is ImageBlock => {
  return block._type === 'imageBlock';
};

export const isImageGalleryBlock = (block: NestedBlock): block is ImageGalleryBlock => {
  return block._type === 'imageGallery';
};

export const isYouTubeVideoBlock = (block: NestedBlock): block is YouTubeVideoBlock => {
  return block._type === 'youTubeVideo';
};

export const isSpotifyWidgetBlock = (block: NestedBlock): block is SpotifyWidgetBlock => {
  return block._type === 'spotifyWidget';
};

export const isBandcampWidgetBlock = (block: NestedBlock): block is BandcampWidgetBlock => {
  return block._type === 'bandcampWidget';
};

export const isCTAButtonBlock = (block: NestedBlock): block is CTAButtonBlock => {
  return block._type === 'ctaButton';
};

export const isCTACalloutLinkBlock = (block: NestedBlock): block is CTACalloutLinkBlock => {
  return block._type === 'ctaCalloutLink';
};

export const isCTAEmailButtonBlock = (block: NestedBlock): block is CTAEmailButtonBlock => {
  return block._type === 'ctaEmailButton';
};

export const isCTAEventBlock = (block: NestedBlock): block is CTAEventBlock => {
  return block._type === 'ctaEvent';
};

export const isEventBlock = (block: NestedBlock): block is EventBlockType => {
  return block._type === 'eventBlock';
};
