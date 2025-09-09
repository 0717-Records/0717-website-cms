import React from 'react';
import { PortableText, stegaClean } from 'next-sanity';
import { createComponents } from '@/sanity/portableTextComponents';
import type { RichTextBlock } from '@/types/blocks';
import { getTextAlignClass, type TextAlignment } from '../../utils/sectionHelpers';
import { resolveAlignment } from './shared/alignmentUtils';

type RichTextProps = RichTextBlock & {
  inheritAlignment?: 'left' | 'center' | 'right';
};

const RichText = ({
  content,
  textAlign = 'inherit',
  isCallout = false,
  inheritAlignment,
}: RichTextProps) => {
  // Clean the values to remove Sanity's stega encoding
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';
  const cleanIsCallout = stegaClean(isCallout) || false;

  // Determine the effective text alignment
  // For callouts, always center (overrides inherited alignment)
  // For regular text, resolve alignment like CTAButton does
  let effectiveTextAlign: TextAlignment;
  if (cleanIsCallout) {
    effectiveTextAlign = 'center';
  } else {
    const resolved = resolveAlignment(cleanTextAlign, inheritAlignment);
    effectiveTextAlign = resolved || 'center';
  }
  if (!content) {
    return null;
  }

  // The portable text components now handle alignment directly

  // Create components with alignment context
  const alignedComponents = createComponents(effectiveTextAlign);

  const proseContent = (
    <div
      className={`prose prose-slate max-w-none text-text-subtle ${getTextAlignClass(effectiveTextAlign)}`}>
      <PortableText value={content} components={alignedComponents} />
    </div>
  );

  // If it's a callout, wrap in Card-style container
  if (cleanIsCallout) {
    return (
      <div className='bg-card-gradient border border-gray-200 rounded-lg p-6 md:p-10 max-w-none text-text-subtle'>
        {proseContent}
      </div>
    );
  }

  return proseContent;
};

export default RichText;
