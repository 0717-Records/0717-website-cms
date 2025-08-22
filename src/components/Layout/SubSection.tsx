import React from 'react';
import Heading from '../Typography/Heading';
import { stegaClean } from 'next-sanity';
import { useTextAlignmentContext } from './PageSection';
import {
  createSanityDataAttribute,
  getTextAlignClass,
  resolveTextAlignment,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

// Import the TextAlignmentContext to provide it to children
import { TextAlignmentContext } from './PageSection';

interface SubSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSections
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
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

  // Create data attribute for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);

  // Determine the effective text alignment
  const effectiveTextAlign = resolveTextAlignment(textAlign || 'inherit', parentTextAlign);

  return (
    <TextAlignmentContext.Provider value={{ textAlign: effectiveTextAlign }}>
      <section
        className={`pb-8 md:pb-12 ${getTextAlignClass(effectiveTextAlign)} ${className}`.trim()}>
        <div className='mb-3 md:mb-4 text-center'>
          <Heading
            level='h3' // Fixed h3 level for SubSections
            className='mb-4'
            showMargin={false}
            {...titleDataAttribute}>
            {stegaClean(title)}
          </Heading>
        </div>
        {children}
      </section>
    </TextAlignmentContext.Provider>
  );
};

export default SubSection;