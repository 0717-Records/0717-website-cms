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

// Context to track if PageSection has a title (affects nested section heading levels)
const PageSectionContext = createContext<{ hasTitle: boolean }>({ hasTitle: false });

interface PageSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Now required since titles are mandatory
  subtitle?: string;
  isFirst?: boolean;
  anchorId?: string; // ID for anchor linking
  inheritAlignment?: 'left' | 'center' | 'right';
  textAlign?: string;
}

const PageSection = ({
  children,
  className = '',
  title,
  subtitle,
  isFirst = false,
  anchorId,
  documentId,
  documentType,
  titlePath,
  subtitlePath,
  inheritAlignment,
  textAlign = 'inherit',
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
  const paddingClasses = isFirst ? 'pt-16 md:pt-24 pb-16 md:pb-24' : 'pb-16 md:pb-24';

  return (
    <PageSectionContext.Provider value={{ hasTitle }}>
      <section
        id={anchorId ? stegaClean(anchorId) : undefined}
        className={`${paddingClasses} ${className}`.trim()}>
        {/* Title is now always present since it's required */}
        <div className={getTextAlignClass(effectiveTextAlign)}>
          <Heading
            level='h2'
            showUnderline
            className='mb-6'
            showMargin={false}
            {...titleDataAttribute}>
            {stegaClean(title)}
          </Heading>
          {subtitle && (
            <p
              className={`text-body-2xl text-text-subtle max-w-3xl whitespace-pre-line ${getSubtitleMarginClass(effectiveTextAlign)}`}
              {...subtitleDataAttribute}>
              {subtitle}
            </p>
          )}
          <Divider />
        </div>
        {children}
      </section>
    </PageSectionContext.Provider>
  );
};

// Hook to access PageSection context
export const usePageSectionContext = () => useContext(PageSectionContext);

export default PageSection;
