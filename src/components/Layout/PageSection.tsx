'use client';

import React, { createContext, useContext } from 'react';
import Heading from '../Typography/Heading';
import Divider from '../UI/Divider';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  getTextAlignClass,
  resolveTextAlignment,
  type TextAlignment,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

// Context to track if PageSection has a title (affects nested section heading levels)
const PageSectionContext = createContext<{ hasTitle: boolean }>({ hasTitle: false });

// Context to cascade text alignment through the component tree
export const TextAlignmentContext = createContext<{ textAlign: TextAlignment }>({
  textAlign: 'center',
});

interface PageSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Now required since titles are mandatory
  subtitle?: string;
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
  isFirst?: boolean;
}

const PageSection = ({
  children,
  className = '',
  title,
  subtitle,
  textAlign = 'center',
  isFirst = false,
  documentId,
  documentType,
  titlePath,
  subtitlePath,
}: PageSectionProps) => {
  // Create data attributes for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);
  const subtitleDataAttribute = createSanityDataAttribute(documentId, documentType, subtitlePath);

  const hasTitle = Boolean(title);
  const paddingClasses = isFirst ? 'pt-16 md:pt-24 pb-16 md:pb-24' : 'pb-16 md:pb-24';

  // For PageSection, 'inherit' doesn't make sense, so default to 'center'
  const cleanTextAlign = resolveTextAlignment(textAlign || 'center', 'center', 'center');

  return (
    <PageSectionContext.Provider value={{ hasTitle }}>
      <TextAlignmentContext.Provider value={{ textAlign: cleanTextAlign }}>
        <section
          className={`${paddingClasses} ${getTextAlignClass(cleanTextAlign)} ${className}`.trim()}>
          <div className='container max-w-[60rem] mx-auto px-8'>
            {/* Title is now always present since it's required */}
            <div className='text-center'>
              <Heading level='h2' className='mb-6' showMargin={false} {...titleDataAttribute}>
                {stegaClean(title)}
              </Heading>
              {subtitle && (
                <p
                  className='text-body-2xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line'
                  {...subtitleDataAttribute}>
                  {subtitle}
                </p>
              )}
              <Divider />
            </div>
            {children}
          </div>
        </section>
      </TextAlignmentContext.Provider>
    </PageSectionContext.Provider>
  );
};

// Hook to access PageSection context
export const usePageSectionContext = () => useContext(PageSectionContext);

// Hook to access text alignment context
export const useTextAlignmentContext = () => useContext(TextAlignmentContext);

export default PageSection;
