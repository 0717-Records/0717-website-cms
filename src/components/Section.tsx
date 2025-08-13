import React from 'react';
import Heading from './UI/Heading';
import { createDataAttribute } from 'next-sanity';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  // Sanity Live editing props
  documentId?: string;
  documentType?: string;
  titlePath?: string;
  subtitlePath?: string;
}

const Section = ({
  children,
  className = '',
  title,
  subtitle,
  documentId,
  documentType,
  titlePath,
  subtitlePath,
}: SectionProps) => {
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

  return (
    <section className={`py-16 md:py-24 ${className}`.trim()}>
      <div className='container mx-auto px-4'>
        {(title || subtitle) && (
          <div className='mb-8 md:mb-12 text-center'>
            {title && (
              <Heading level='h2' className='mb-6' {...getTitleDataAttribute()}>
                {title}
              </Heading>
            )}
            {subtitle && (
              <p
                className='text-body-2xl text-text-subtle max-w-3xl mx-auto'
                {...getSubtitleDataAttribute()}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
