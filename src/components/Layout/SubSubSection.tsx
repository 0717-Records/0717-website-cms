import React from 'react';
import Heading from '../Typography/Heading/Heading';
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

interface SubSubSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSubSections
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
}

const SubSubSection = ({
  children,
  className = '',
  title,
  textAlign = 'inherit',
  documentId,
  documentType,
  titlePath,
}: SubSubSectionProps) => {
  const { textAlign: parentTextAlign } = useTextAlignmentContext();

  // Create data attribute for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);

  // Determine the effective text alignment
  const effectiveTextAlign = resolveTextAlignment(textAlign || 'inherit', parentTextAlign);

  return (
    <TextAlignmentContext.Provider value={{ textAlign: effectiveTextAlign }}>
      <section
        className={`pb-6 md:pb-8 ${getTextAlignClass(effectiveTextAlign)} ${className}`.trim()}>
        <div className='mb-2 md:mb-3 text-center'>
          <Heading
            level='h4' // Fixed h4 level for SubSubSections
            className='mb-3'
            showMargin={false}
            showUnderline={false}
            {...titleDataAttribute}>
            {stegaClean(title)}
          </Heading>
        </div>
        {children}
      </section>
    </TextAlignmentContext.Provider>
  );
};

export default SubSubSection;