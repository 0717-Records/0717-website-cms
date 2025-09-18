'use client';

import React, { createContext, useContext } from 'react';
import Heading from '../Typography/Heading/Heading';
import Divider from '../UI/Divider';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  type SanityLiveEditingProps,
  getTextAlignClass,
  type TextAlignment,
} from '../../utils/sectionHelpers';
import { resolveAlignment } from '../blocks/shared/alignmentUtils';
import {
  sectionTitleBottomSpacing,
  sectionDividerBottomSpacing,
  sectionBottomPadding,
} from '@/utils/spacingConstants';

// Context to track if PageSection has a title (affects nested section heading levels)
const PageSectionContext = createContext<{ hasTitle: boolean }>({ hasTitle: false });

interface PageSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Now required since titles are mandatory
  subtitle?: string;
  anchorId?: string; // ID for anchor linking
  inheritAlignment?: 'left' | 'center' | 'right';
  textAlign?: string; // NOTE: This field is currently not set in the CMS, but has been left here for the future in case we want to allow for section level text alignment control in the CMS
  shouldApplyBottomPadding?: boolean; // Whether to apply bottom padding (omitted for last section if no orphaned content follows)
}

const PageSection = ({
  children,
  className = '',
  title,
  subtitle,
  anchorId,
  documentId,
  documentType,
  titlePath,
  subtitlePath,
  inheritAlignment,
  textAlign = 'inherit',
  shouldApplyBottomPadding = true,
}: PageSectionProps) => {
  // Create data attributes for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);
  const subtitleDataAttribute = createSanityDataAttribute(documentId, documentType, subtitlePath);

  // Resolve alignment using shared utility (same as other components)
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';
  const resolved = resolveAlignment(cleanTextAlign, inheritAlignment);
  const effectiveTextAlign = (resolved || 'center') as TextAlignment;

  // Get margin class for subtitle based on alignment
  const getSubtitleMarginClass = (align: TextAlignment) => {
    switch (align) {
      case 'left':
        return 'mr-auto';
      case 'right':
        return 'ml-auto';
      default: // center
        return 'mx-auto';
    }
  };

  const hasTitle = Boolean(title);

  return (
    <PageSectionContext.Provider value={{ hasTitle }}>
      <section
        id={anchorId ? stegaClean(anchorId) : undefined}
        className={`${shouldApplyBottomPadding ? sectionBottomPadding : ''} ${className}`.trim()}>
        {/* Title is now always present since it's required */}
        <div className={getTextAlignClass(effectiveTextAlign)}>
          <Heading
            level='h2'
            showUnderline
            showMargin={false}
            className={sectionTitleBottomSpacing}
            {...titleDataAttribute}>
            {stegaClean(title)}
          </Heading>
          {subtitle && (
            <p
              className={`text-body-xl text-text-subtle max-w-4xl whitespace-pre-line ${sectionTitleBottomSpacing} ${getSubtitleMarginClass(effectiveTextAlign)}`}
              {...subtitleDataAttribute}>
              {subtitle}
            </p>
          )}
          <div className={sectionDividerBottomSpacing}>
            <Divider alignment={effectiveTextAlign} />
          </div>
        </div>
        {children}
      </section>
    </PageSectionContext.Provider>
  );
};

// Hook to access PageSection context
export const usePageSectionContext = () => useContext(PageSectionContext);

export default PageSection;
