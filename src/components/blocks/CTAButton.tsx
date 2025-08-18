import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTAButtonBlock } from '@/types/blocks';
import CTA from '../UI/CTA';

// Type for a dereferenced page object
interface DereferencedPage {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
}

// Type for internalLink that can be either a reference or dereferenced
type InternalLinkType = 
  | { _ref: string; _type: 'reference' }
  | DereferencedPage;

interface CTAButtonProps extends Omit<CTAButtonBlock, '_type' | '_key' | 'internalLink'> {
  className?: string;
  internalLink?: InternalLinkType;
}

const CTAButton = ({
  text,
  variant = 'filled',
  alignment = 'inherit',
  linkType,
  internalLink,
  externalUrl,
  openInNewTab = false,
  className = '',
}: CTAButtonProps) => {
  const cleanText = stegaClean(text);
  const cleanExternalUrl = stegaClean(externalUrl);
  const cleanAlignment = stegaClean(alignment);
  const cleanVariant = stegaClean(variant) as 'filled' | 'outline';

  // Don't render if no text or invalid link
  if (!cleanText) {
    return null;
  }

  // Determine the href based on link type
  let href = '';
  if (linkType === 'internal' && internalLink) {
    // Handle both reference objects and dereferenced objects
    if ('slug' in internalLink && internalLink.slug?.current) {
      href = `/${internalLink.slug.current}`;
    }
    // If it's just a reference, we can't build the URL without dereferencing
    // This would need to be handled in the GROQ query by dereferencing with ->
  } else if (linkType === 'external' && cleanExternalUrl) {
    href = cleanExternalUrl;
  }

  // Don't render if no valid href
  if (!href) {
    return null;
  }

  // Determine if this should open in a new tab
  const shouldOpenInNewTab = linkType === 'external' || (linkType === 'internal' && openInNewTab);

  // Determine alignment classes
  let alignmentClasses = '';
  switch (cleanAlignment) {
    case 'left':
      alignmentClasses = 'text-left';
      break;
    case 'center':
      alignmentClasses = 'text-center';
      break;
    case 'right':
      alignmentClasses = 'text-right';
      break;
    case 'inherit':
    default:
      alignmentClasses = '';
      break;
  }

  // Create external link icon (using SVG since we don't have a specific icon import)
  const ExternalLinkIcon = () => (
    <svg
      className="w-4 h-4 ml-1.5 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  return (
    <div className={`${alignmentClasses} ${className}`.trim()}>
      <CTA
        href={href}
        variant={cleanVariant}
        target={shouldOpenInNewTab ? '_blank' : undefined}
        rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}
      >
        {cleanText}
        {shouldOpenInNewTab && <ExternalLinkIcon />}
      </CTA>
    </div>
  );
};

export default CTAButton;