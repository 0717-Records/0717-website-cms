import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTAButtonBlock } from '@/types/blocks';
import CTA from '../UI/CTA';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Type for a dereferenced page object
interface DereferencedPage {
  _id: string;
  _type?: string;
  title?: string;
  slug?: {
    current: string;
  };
  pageType?: string;
  href?: string | null;
}

// Type for internalLink that can be either a reference or dereferenced
type InternalLinkType = { _ref: string; _type: 'reference' } | DereferencedPage;

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
  if (linkType === 'internal') {
    if (internalLink) {
      // Handle both reference objects and dereferenced objects
      if ('href' in internalLink && internalLink.href) {
        // Use the pre-computed href from the GROQ query
        href = internalLink.href;
      } else if ('slug' in internalLink && internalLink.slug?.current) {
        // Fallback to slug-based URL for backward compatibility
        href = `/${internalLink.slug.current}`;
      }
      // If it's just a reference, we can't build the URL without dereferencing
      // This would need to be handled in the GROQ query by dereferencing with ->
    } else {
      // Default to home page if no internal link is selected
      href = '/';
    }
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

  return (
    <div className={`${alignmentClasses} ${className}`.trim()}>
      <CTA
        href={href}
        variant={cleanVariant}
        target={shouldOpenInNewTab ? '_blank' : undefined}
        rel={shouldOpenInNewTab ? 'noopener noreferrer' : undefined}>
        {cleanText}
        {shouldOpenInNewTab && <FaExternalLinkAlt className='ml-4' />}
      </CTA>
    </div>
  );
};

export default CTAButton;
