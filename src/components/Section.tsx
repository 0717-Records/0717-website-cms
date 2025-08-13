import React from 'react';
import Heading from './UI/Heading';
import { createDataAttribute } from 'next-sanity';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  // Sanity Live editing props
  documentId?: string;
  documentType?: string;
  titlePath?: string;
}

const Section = ({
  children,
  className = '',
  title,
  documentId,
  documentType,
  titlePath,
}: SectionProps) => {
  // Create data attribute for title if Sanity props are provided
  const getTitleDataAttribute = () => {
    if (!documentId || !documentType || !titlePath) return {};

    try {
      return createDataAttribute({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        baseUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '',
        id: documentId,
        type: documentType,
        path: titlePath,
      });
    } catch {
      return {};
    }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`.trim()}>
      <div className='container mx-auto px-4'>
        {title && (
          <div className='mb-8 md:mb-12 text-center'>
            <Heading level='h2' className='mb-4' {...getTitleDataAttribute()}>
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
