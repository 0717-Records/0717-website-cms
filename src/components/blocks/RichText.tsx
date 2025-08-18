import React from 'react';
import { PortableText, stegaClean } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { RichTextBlock } from '@/types/blocks';
import { useTextAlignmentContext } from '../Layout/PageSection';

const RichText = ({ content, textAlign = 'inherit', isCallout = false }: RichTextBlock) => {
  const { textAlign: parentTextAlign } = useTextAlignmentContext();

  // Clean the values to remove Sanity's stega encoding
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';
  const cleanIsCallout = stegaClean(isCallout) || false;

  // Determine the effective text alignment
  // For callouts, default to center alignment unless explicitly set
  const effectiveTextAlign =
    cleanIsCallout && cleanTextAlign === 'inherit'
      ? 'center'
      : cleanTextAlign === 'inherit'
        ? parentTextAlign
        : cleanTextAlign;

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
  if (!content) {
    return null;
  }

  const getCustomStyles = (align: 'left' | 'center' | 'right') => {
    if (align === 'center') {
      return {
        '--list-style-position': 'inside',
      } as React.CSSProperties;
    }
    return {};
  };

  const getListStyleClass = (align: 'left' | 'center' | 'right') => {
    if (align === 'center') {
      return '[&_ul]:list-inside [&_ol]:list-inside [&_ul]:pl-0 [&_ol]:pl-0';
    }
    return '';
  };

  const proseContent = (
    <div
      className={`prose prose-slate max-w-none ${getTextAlignClass(effectiveTextAlign)} ${getListStyleClass(effectiveTextAlign)}`}
      style={getCustomStyles(effectiveTextAlign)}>
      <PortableText value={content} components={components} />
    </div>
  );

  // If it's a callout, wrap in Card-style container
  if (cleanIsCallout) {
    return (
      <div className='bg-card-gradient border border-gray-200 rounded-lg p-6 md:p-10 max-w-none'>
        {proseContent}
      </div>
    );
  }

  return proseContent;
};

export default RichText;
