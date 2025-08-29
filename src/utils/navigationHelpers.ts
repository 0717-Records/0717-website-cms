
import type { HEADER_QUERYResult } from '@/sanity/types';

// Extract the types from the generated Sanity types
type HeaderResult = Extract<HEADER_QUERYResult, { _type: 'header' }>;
export type NavigationLink = Extract<NonNullable<HeaderResult['verticalNav']>[0], { _type: 'navLink' }>;
export type NavigationDivider = Extract<NonNullable<HeaderResult['verticalNav']>[0], { _type: 'divider' }>;
export type NavigationItem = NonNullable<HeaderResult['verticalNav']>[0];

export const getNavLinkProps = (link: NavigationLink) => {
  const props: {
    href: string;
    target?: string;
    rel?: string;
  } = {
    href: link.computedHref || '/',
  };

  if (link.linkType === 'external' || link.openInNewTab) {
    props.target = '_blank';
    props.rel = 'noopener noreferrer';
  }

  return props;
};

export const getNavLinkLabel = (link: NavigationLink): string => {
  return link.label || 'Unnamed Link';
};

export const isNavigationLink = (item: NavigationItem): item is NavigationLink => {
  return item._type === 'navLink';
};

export const isNavigationDivider = (item: NavigationItem): item is NavigationDivider => {
  return item._type === 'divider';
};

export type HorizontalNavData = NonNullable<HeaderResult['horizontalNav']>;
export type VerticalNavData = NonNullable<HeaderResult['verticalNav']>;