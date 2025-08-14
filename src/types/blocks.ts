// Block types that support unlimited nesting
// This type represents any block that can contain other blocks

import type { SplitImage, ItemList, Divider, Hero, Feature, Grid } from '@/sanity/types';

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
export type SplitImageBlock = SplitImage & { _key: string };
export type ItemListBlock = ItemList & { _key: string };
export type DividerBlock = Divider & { _key: string };
export type HeroBlock = Hero & { _key: string; content?: NestedBlock[] };
export type FeatureBlock = Feature & { _key: string; content?: NestedBlock[] };
export type GridBlock = Grid & { _key: string };

// Union of all possible block types (current and future)
export type NestedBlock =
  | SectionBlock
  | SplitImageBlock
  | HeroBlock
  | FeatureBlock
  | DividerBlock
  | ItemListBlock
  | GridBlock;

// Union of blocks that can contain nested content
export type BlockWithContent = SectionBlock | HeroBlock | FeatureBlock | GridBlock;

// Type guard functions
export const isBlockWithContent = (block: NestedBlock): block is BlockWithContent => {
  return (
    block._type === 'section' ||
    block._type === 'hero' ||
    block._type === 'feature' ||
    block._type === 'grid'
  );
};

export const isSectionBlock = (block: NestedBlock): block is SectionBlock => {
  return block._type === 'section';
};

export const isSplitImageBlock = (block: NestedBlock): block is SplitImageBlock => {
  return block._type === 'splitImage';
};

export const isDividerBlock = (block: NestedBlock): block is DividerBlock => {
  return block._type === 'divider';
};

export const isItemListBlock = (block: NestedBlock): block is ItemListBlock => {
  return block._type === 'itemList';
};

export const isGridBlock = (block: NestedBlock): block is GridBlock => {
  return block._type === 'grid';
};
