'use client';

import React, { createContext, useContext } from 'react';
import Heading from '../Typography/Heading/Heading';
import Divider from '../UI/Divider';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

// Context to track if PageSection has a title (affects nested section heading levels)
const PageSectionContext = createContext<{ hasTitle: boolean }>({ hasTitle: false });

interface PageSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Now required since titles are mandatory
  subtitle?: string;
  isFirst?: boolean;
  anchorId?: string; // ID for anchor linking
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
}: PageSectionProps) => {
  // Create data attributes for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);
  const subtitleDataAttribute = createSanityDataAttribute(documentId, documentType, subtitlePath);

  const hasTitle = Boolean(title);
  const paddingClasses = isFirst ? 'pt-16 md:pt-24 pb-16 md:pb-24' : 'pb-16 md:pb-24';


  return (
    <PageSectionContext.Provider value={{ hasTitle }}>
      <section
        id={anchorId ? stegaClean(anchorId) : undefined}
        className={`${paddingClasses} ${className}`.trim()}>
          {/* Title is now always present since it's required */}
          <div className='text-center'>
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
                className='text-body-2xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line'
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
