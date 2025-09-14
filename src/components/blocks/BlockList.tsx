import React from 'react';
import type { BlockListBlock } from '@/types/blocks';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface BlockListProps extends Omit<BlockListBlock, '_type' | '_key'> {
  className?: string;
  documentId?: string;
  documentType?: string;
  fieldPathPrefix?: string;
}

const BlockList = ({
  items = [],
  className = '',
  documentId,
  documentType,
  fieldPathPrefix = ''
}: BlockListProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item, index) => {
        const itemPath = fieldPathPrefix ? `${fieldPathPrefix}.items[${index}]` : `items[${index}]`;

        return (
          <div
            key={item._key}
            className='flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg'>
            {/* Left Hand Side (primary) content */}
            <div className='flex-shrink-0'>
              <span
                {...(documentId && documentType ? createSanityDataAttribute(documentId, documentType, `${itemPath}.leftContent`) : {})}
                className='text-body-lg font-bold text-gray-900'>
                {item.leftContent}
              </span>
            </div>

            {/* Right Hand Side (secondary) content */}
            <div className='flex-shrink-0 text-right'>
              {item.rightContent && (
                <span
                  {...(documentId && documentType ? createSanityDataAttribute(documentId, documentType, `${itemPath}.rightContent`) : {})}
                  className='text-body-base text-gray-700'>
                  {item.rightContent}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlockList;