import React from 'react';
import Heading from '../Typography/Heading/Heading';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  getTextAlignClass,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

interface SubSubSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSubSections
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
  anchorId?: string; // ID for anchor linking
}

const SubSubSection = ({
  children,
  className = '',
  title,
  textAlign = 'center',
  anchorId,
  documentId,
  documentType,
  titlePath,
}: SubSubSectionProps) => {
  // Create data attribute for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);

  // Clean and use the textAlign value directly
  const cleanTextAlign = stegaClean(textAlign) || 'center';
  
  // Default to center if inherit is passed (since we're not doing inheritance)
  const effectiveTextAlign = cleanTextAlign === 'inherit' ? 'center' : cleanTextAlign;

  return (
    <section
      id={anchorId ? stegaClean(anchorId) : undefined}
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
  );
};

export default SubSubSection;