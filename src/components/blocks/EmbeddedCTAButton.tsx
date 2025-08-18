import React from 'react';
import { stegaClean } from 'next-sanity';
import CTA from '../UI/CTA';

// Type for a dereferenced page object
interface DereferencedPage {
  _id: string;
  title: string | null;
  slug: {
    current?: string;
  } | null;
}

// Type for internalLink that can be either a reference, dereferenced, or null
type InternalLinkType = 
  | { _ref: string; _type: 'reference' }
  | DereferencedPage
  | null;

interface EmbeddedCTAButtonProps {
  className?: string;
  text?: string | null;
  variant?: "filled" | "outline" | null;
  linkType?: "internal" | "external" | null;
  internalLink?: InternalLinkType;
  openInNewTab?: boolean | null;
  externalUrl?: string | null;
}

const EmbeddedCTAButton = ({
  text,
  variant = 'filled',
  linkType,
  internalLink,
  externalUrl,
  openInNewTab = false,
  className = '',
}: EmbeddedCTAButtonProps) => {
  const cleanText = stegaClean(text);
  const cleanExternalUrl = stegaClean(externalUrl);
  const cleanVariant = stegaClean(variant || 'filled') as 'filled' | 'outline';

  // Don't render if no text
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
    <div className={className}>
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

export default EmbeddedCTAButton;