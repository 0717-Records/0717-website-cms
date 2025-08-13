// Block types that support unlimited nesting
// This type represents any block that can contain other blocks

export interface BaseBlock {
  _key: string;
  _type: string;
}

export interface SectionBlock extends BaseBlock {
  _type: 'section';
  title?: string;
  content?: NestedBlock[];
}

export interface SplitImageBlock extends BaseBlock {
  _type: 'splitImage';
  // SplitImage specific properties would go here
  [key: string]: unknown; // Temporary until we define exact props
}

// Future blocks that can contain nested content
export interface HeroBlock extends BaseBlock {
  _type: 'hero';
  content?: NestedBlock[];
}

export interface FeatureBlock extends BaseBlock {
  _type: 'feature';
  content?: NestedBlock[];
}

// Union of all possible block types (current and future)
export type NestedBlock = SectionBlock | SplitImageBlock | HeroBlock | FeatureBlock;
// Add more block types here as needed

// Union of blocks that can contain nested content
export type BlockWithContent = SectionBlock | HeroBlock | FeatureBlock;

// Type guard functions
export const isBlockWithContent = (block: NestedBlock): block is BlockWithContent => {
  return block._type === 'section' || block._type === 'hero' || block._type === 'feature';
};

export const isSectionBlock = (block: NestedBlock): block is SectionBlock => {
  return block._type === 'section';
};

export const isSplitImageBlock = (block: NestedBlock): block is SplitImageBlock => {
  return block._type === 'splitImage';
};
