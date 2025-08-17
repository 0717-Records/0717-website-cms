import React from 'react';
import Heading from '../Typography/Heading';
import { createDataAttribute } from 'next-sanity';
import { usePageSectionContext } from './PageSection';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  nestingLevel?: number;
  omitBottomPadding?: boolean;
  // Sanity Live editing props
  documentId?: string;
  documentType?: string;
  titlePath?: string;
}

const Section = ({
  children,
  className = '',
  title,
  nestingLevel = 1,
  omitBottomPadding = false,
  documentId,
  documentType,
  titlePath,
}: SectionProps) => {
  const { hasTitle: pageSectionHasTitle } = usePageSectionContext();

  // Calculate the appropriate heading level based on:
  // 1. Whether the parent PageSection has a title (h2)
  // 2. The current nesting level within sections
  const getHeadingLevel = (): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' => {
    // If PageSection has a title (h2), start sections at h3
    // If PageSection has no title, start sections at h2
    const baseLevel = pageSectionHasTitle ? 3 : 2;
    const level = Math.min(Math.max(baseLevel + (nestingLevel - 1), 1), 6);
    return `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };
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

  const paddingClasses = omitBottomPadding ? '' : 'pb-8 md:pb-12';

  return (
    <section className={`${paddingClasses} ${className}`.trim()}>
      <div className='container max-w-[80rem] mx-auto px-8'>
        {title && (
          <div className='mb-6 md:mb-8 text-center'>
            <Heading
              level={getHeadingLevel()}
              className='mb-4'
              showMargin={false}
              {...getTitleDataAttribute()}>
              {title}
            </Heading>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
