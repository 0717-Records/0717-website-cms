import React from 'react';
import Heading from '../Typography/Heading/Heading';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  getTextAlignClass,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

interface SubSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSections
  textAlign?: 'inherit' | 'left' | 'center' | 'right';
  anchorId?: string; // ID for anchor linking
}

const SubSection = ({
  children,
  className = '',
  title,
  textAlign = 'center',
  anchorId,
  documentId,
  documentType,
  titlePath,
}: SubSectionProps) => {
  // Create data attribute for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);

  // Clean and use the textAlign value directly
  const cleanTextAlign = stegaClean(textAlign) || 'center';
  
  // Default to center if inherit is passed (since we're not doing inheritance)
  const effectiveTextAlign = cleanTextAlign === 'inherit' ? 'center' : cleanTextAlign;

  return (
    <section
      id={anchorId ? stegaClean(anchorId) : undefined}
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
  );
};

export default SubSection;