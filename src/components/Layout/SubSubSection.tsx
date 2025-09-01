import React from 'react';
import Heading from '../Typography/Heading/Heading';
import { stegaClean } from 'next-sanity';
import {
  createSanityDataAttribute,
  type SanityLiveEditingProps,
} from '../../utils/sectionHelpers';

interface SubSubSectionProps extends SanityLiveEditingProps {
  children: React.ReactNode;
  className?: string;
  title: string; // Required for SubSubSections
  anchorId?: string; // ID for anchor linking
}

const SubSubSection = ({
  children,
  className = '',
  title,
  anchorId,
  documentId,
  documentType,
  titlePath,
}: SubSubSectionProps) => {
  // Create data attribute for Sanity live editing
  const titleDataAttribute = createSanityDataAttribute(documentId, documentType, titlePath);


  return (
    <section
      id={anchorId ? stegaClean(anchorId) : undefined}
      className={`pb-6 md:pb-8 ${className}`.trim()}>
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