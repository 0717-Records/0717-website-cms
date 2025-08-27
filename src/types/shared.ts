import type { SITE_SETTINGS_QUERYResult } from '@/sanity/types';

// Shared type definitions for components that use site settings
export interface SiteSettingsProps {
  companyEmail?: string;
  companyLinks?: NonNullable<SITE_SETTINGS_QUERYResult>['companyLinks'];
}

// Link system types - shared across CTA components
export interface DereferencedPage {
  _id: string;
  _type?: string;
  title?: string | null;
  slug?: {
    current?: string;
  } | null;
  pageType?: string;
  href?: string | null;
}

export interface InternalLinkReference {
  _ref: string;
  _type: 'reference';
}

export type InternalLinkType = InternalLinkReference | DereferencedPage | null;

// Block props utility types
export type BlockProps<T> = Omit<T, '_type' | '_key'> & {
  className?: string;
};

export type CTABlockProps<T> = Omit<T, '_type' | '_key' | 'internalLink'> & {
  className?: string;
  internalLink?: InternalLinkType;
};

// Common UI types
export type ButtonVariant = 'filled' | 'outline';

// Re-export text alignment types from sectionHelpers for consistency
export type { TextAlignment, TextAlignmentWithInherit } from '@/utils/sectionHelpers';