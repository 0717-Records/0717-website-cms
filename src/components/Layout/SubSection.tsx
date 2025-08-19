import React from 'react';
import Heading from '../Typography/Heading';
import Divider from '../UI/Divider';
import { createDataAttribute, stegaClean } from 'next-sanity';
import { useTextAlignmentContext } from './PageSection';

// Import the TextAlignmentContext to provide it to children
import { TextAlignmentContext } from './PageSection';

interface SubSectionProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSections
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
  // Sanity Live editing props
  documentId?: string;
  documentType?: string;
  titlePath?: string;
}

const SubSection = ({
  children,
  className = '',
  title,
  textAlign = 'inherit',
  documentId,
  documentType,
  titlePath,
}: SubSectionProps) => {
  const { textAlign: parentTextAlign } = useTextAlignmentContext();

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

  // Clean the textAlign value to remove Sanity's stega encoding
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';

  // Determine the effective text alignment
  const effectiveTextAlign = cleanTextAlign === 'inherit' ? parentTextAlign : cleanTextAlign;

  const getTextAlignClass = (align: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-center';
    }
  };

  return (
    <TextAlignmentContext.Provider value={{ textAlign: effectiveTextAlign }}>
      <section
        className={`pb-8 md:pb-12 ${getTextAlignClass(effectiveTextAlign)} ${className}`.trim()}>
        <div className='mb-3 md:mb-4 text-center'>
          <Heading
            level='h3' // Fixed h3 level for SubSections
            className='mb-4'
            showMargin={false}
            {...getTitleDataAttribute()}>
            {title}
          </Heading>
          <Divider />
        </div>
        {children}
      </section>
    </TextAlignmentContext.Provider>
  );
};

export default SubSection;