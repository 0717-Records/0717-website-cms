import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTAButtonBlock } from '@/types/blocks';
import type { CTABlockProps } from '@/types/shared';
import CTA from '../UI/CTA';
import { FaExternalLinkAlt } from 'react-icons/fa';

type CTAButtonProps = CTABlockProps<CTAButtonBlock>;

const CTAButton = (props: CTAButtonProps) => {
  const {
    text,
    variant = 'filled',
    alignment = 'inherit',
    linkType,
    internalLink,
    externalUrl,
    openInNewTab = false,
    computedHref,
    className = '',
  } = props;

  console.log(props);

  const cleanText = stegaClean(text);
  const cleanExternalUrl = stegaClean(externalUrl);
  const cleanAlignment = stegaClean(alignment);
  const cleanVariant = stegaClean(variant) as 'filled' | 'outline';

  // Don't render if no text or invalid link
  if (!cleanText) {
    return null;
  }

  // Use computed href from enhanced GROQ query if available, otherwise fallback to legacy logic
  let href = '';

  if (computedHref) {
    href = stegaClean(computedHref);
  } else {
    // Legacy href computation for backward compatibility
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
      alignmentClasses = 'justify-start';
      break;
    case 'center':
      alignmentClasses = 'justify-center';
      break;
    case 'right':
      alignmentClasses = 'justify-end';
      break;
    case 'inherit':
    default:
      alignmentClasses = '';
      break;
  }

  return (
    <div className={`flex ${alignmentClasses} ${className}`.trim()}>
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
