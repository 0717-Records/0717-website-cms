// Block types that support unlimited nesting
// This type represents any block that can contain other blocks

import type { ItemList, Divider, RichText, Card, CardGrid, Icon } from '@/sanity/types';

export interface BaseBlock {
  _key: string;
  _type: string;
}

export interface SectionBlock extends BaseBlock {
  _type: 'section';
  title?: string;
  subtitle?: string;
  content?: NestedBlock[];
}

// Use generated Sanity types for proper typing
export type ItemListBlock = ItemList & { _key: string };
export type DividerBlock = Divider & { _key: string };
export type RichTextBlock = RichText & { _key: string };
export type CardBlock = Card & { _key: string };
export type CardGridBlock = CardGrid & { _key: string };
export type IconBlock = Icon & { _key: string };

// Union of all possible block types (current and future)
export type NestedBlock =
  | SectionBlock
  | DividerBlock
  | ItemListBlock
  | RichTextBlock
  | CardBlock
  | CardGridBlock
  | IconBlock;

// Union of blocks that can contain nested content
export type BlockWithContent = SectionBlock | CardBlock;

// Type guard functions
export const isBlockWithContent = (block: NestedBlock): block is BlockWithContent => {
  return block._type === 'section' || block._type === 'card';
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

export const isCardBlock = (block: NestedBlock): block is CardBlock => {
  return block._type === 'card';
};

export const isCardGridBlock = (block: NestedBlock): block is CardGridBlock => {
  return block._type === 'cardGrid';
};

export const isIconBlock = (block: NestedBlock): block is IconBlock => {
  return block._type === 'icon';
};
