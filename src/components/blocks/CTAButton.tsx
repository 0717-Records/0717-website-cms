import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTAButtonBlock } from '@/types/blocks';
import type { CTABlockProps } from '@/types/shared';
import CTA from '../UI/CTA';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getAlignmentClasses } from './shared/alignmentUtils';

type CTAButtonProps = CTABlockProps<CTAButtonBlock>;

const CTAButton = (props: CTAButtonProps) => {
  const {
    text,
    variant = 'filled',
    alignment = 'inherit',
    inheritAlignment,
    linkType,
    internalLink,
    externalUrl,
    openInNewTab = false,
    computedHref,
    className = '',
    pageSectionId,
  } = props;


  const cleanText = stegaClean(text);
  const cleanExternalUrl = stegaClean(externalUrl);
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
          // Use the pre-computed href from the GROQ query (dereferenced object)
          href = internalLink.href;
        } else if ('slug' in internalLink && internalLink.slug?.current) {
          // Fallback to slug-based URL for backward compatibility
          href = `/${internalLink.slug.current}`;
        } else {

          // Check if this is a dereferenced object (has actual page type) or reference object
          const pageType = internalLink._type;
          if (pageType && pageType !== 'reference') {
            // This is a dereferenced object - use the actual page type for URL generation
            if (pageType === 'homePage') {
              href = '/';
            } else if (pageType === 'eventsIndexPage') {
              href = '/events';
            } else if (pageType === 'favouritesIndexPage') {
              href = '/favourites';
            } else if (pageType === 'blogIndexPage') {
              href = '/blog';
            } else if (pageType === 'termsAndConditions') {
              href = '/terms-and-conditions';
            } else if (pageType === 'privacyPolicy') {
              href = '/privacy-policy';
            } else if (pageType === 'blogPost' && 'slug' in internalLink && internalLink.slug?.current) {
              href = `/blog/${internalLink.slug.current}`;
            } else if (pageType === 'collab' && 'slug' in internalLink && internalLink.slug?.current) {
              href = `/collabs/${internalLink.slug.current}`;
            } else if ('slug' in internalLink && internalLink.slug?.current) {
              href = `/${internalLink.slug.current}`;
            }
          } else if (pageType === 'reference' && '_ref' in internalLink) {
            // This is a reference object - we need the _ref to identify the page
            if (internalLink._ref === 'homePage') {
              href = '/';
            } else if (internalLink._ref === 'eventsIndexPage') {
              href = '/events';
            } else if (internalLink._ref === 'favouritesIndexPage') {
              href = '/favourites';
            } else if (internalLink._ref === 'blogIndexPage') {
              href = '/blog';
            } else if (internalLink._ref === 'termsAndConditions') {
              href = '/terms-and-conditions';
            } else if (internalLink._ref === 'privacyPolicy') {
              href = '/privacy-policy';
            }
          }
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

  // Add section anchor if pageSectionId is provided for internal links
  if (href && linkType === 'internal' && pageSectionId) {
    href = `${href}#${stegaClean(pageSectionId)}`;
  }

  // Don't render if no valid href
  if (!href) {
    return null;
  }

  // Determine if this should open in a new tab
  const shouldOpenInNewTab = linkType === 'external' || (linkType === 'internal' && openInNewTab);

  const alignmentClasses = getAlignmentClasses(alignment, inheritAlignment);

  // Determine width class - if className contains 'w-full', use that, otherwise use responsive default
  const widthClass = className.includes('w-full') ? 'w-full' : 'w-full sm:w-auto';

  return (
    <div className={`flex ${alignmentClasses} ${className}`.trim()}>
      <CTA
        className={widthClass}
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
