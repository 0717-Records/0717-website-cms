import React from 'react';
import { PortableText } from 'next-sanity';
import { components } from '@/sanity/portableTextComponents';
import type { RichTextBlock } from '@/types/blocks';

const RichText = ({ content }: RichTextBlock) => {
  if (!content) {
    return null;
  }

  return (
    <div className='prose prose-slate max-w-none'>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichText;
