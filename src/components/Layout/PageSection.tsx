import React, { createContext, useContext } from 'react';
import Heading from '../Typography/Heading';
import Divider from '../UI/Divider';
import { createDataAttribute } from 'next-sanity';

// Context to track if PageSection has a title (affects nested section heading levels)
const PageSectionContext = createContext<{ hasTitle: boolean }>({ hasTitle: false });

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  isFirst?: boolean;
  // Sanity Live editing props
  documentId?: string;
  documentType?: string;
  titlePath?: string;
  subtitlePath?: string;
}

const PageSection = ({
  children,
  className = '',
  title,
  subtitle,
  isFirst = false,
  documentId,
  documentType,
  titlePath,
  subtitlePath,
}: PageSectionProps) => {
  // Create data attribute for title if Sanity props are provided
  const getTitleDataAttribute = () => {
    if (!documentId || !documentType || !titlePath) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
          baseUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '',
          id: documentId,
          type: documentType,
          path: titlePath,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  // Create data attribute for subtitle if Sanity props are provided
  const getSubtitleDataAttribute = () => {
    if (!documentId || !documentType || !subtitlePath) return {};

    try {
      return {
        'data-sanity': createDataAttribute({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
          baseUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '',
          id: documentId,
          type: documentType,
          path: subtitlePath,
        }).toString(),
      };
    } catch {
      return {};
    }
  };

  const hasTitle = Boolean(title);
  const paddingClasses = isFirst ? 'pt-16 md:pt-24 pb-16 md:pb-24' : 'pb-16 md:pb-24';

  return (
    <PageSectionContext.Provider value={{ hasTitle }}>
      <section className={`${paddingClasses} ${className}`.trim()}>
        <div className='container max-w-[80rem] mx-auto'>
          {(title || subtitle) && (
            <div className='text-center'>
              {title && (
                <Heading
                  level='h2'
                  className='mb-6'
                  showMargin={false}
                  {...getTitleDataAttribute()}>
                  {title}
                </Heading>
              )}
              {subtitle && (
                <p
                  className='text-body-2xl text-text-subtle max-w-3xl mx-auto whitespace-pre-line'
                  {...getSubtitleDataAttribute()}>
                  {subtitle}
                </p>
              )}
              <Divider />
            </div>
          )}
          {children}
        </div>
      </section>
    </PageSectionContext.Provider>
  );
};

// Hook to access PageSection context
export const usePageSectionContext = () => useContext(PageSectionContext);

export default PageSection;
