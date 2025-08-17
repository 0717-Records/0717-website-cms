import React from 'react';
import { PortableText, stegaClean } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { RichTextBlock } from '@/types/blocks';
import { useTextAlignmentContext } from '../Layout/PageSection';

const RichText = ({ content, textAlign = 'inherit' }: RichTextBlock) => {
  const { textAlign: parentTextAlign } = useTextAlignmentContext();
  
  // Clean the textAlign value to remove Sanity's stega encoding
  const cleanTextAlign = stegaClean(textAlign) || 'inherit';
  
  // Determine the effective text alignment
  const effectiveTextAlign = cleanTextAlign === 'inherit' ? parentTextAlign : cleanTextAlign;
  
  const getTextAlignClass = (align: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left': return 'text-left';
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-center';
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

  return (
    <div 
      className={`prose prose-slate max-w-none ${getTextAlignClass(effectiveTextAlign)} ${getListStyleClass(effectiveTextAlign)}`}
      style={getCustomStyles(effectiveTextAlign)}
    >
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichText;
