import React from 'react';
import { stegaClean } from 'next-sanity';
import type { GridBlock } from '@/types/blocks';
import ItemList from './ItemList';
import Divider from '../UI/Divider';

interface GridProps extends Omit<GridBlock, '_type' | '_key'> {
  className?: string;
}

const Grid = ({ items = [], columns, alignment, className = '' }: GridProps) => {
  // Clean the values to remove Sanity's stega encoding characters
  const cleanColumns = stegaClean(columns);
  const cleanAlignment = stegaClean(alignment);

  // Ensure we have valid values with fallbacks
  const validColumns = cleanColumns && ['2', '3', '4'].includes(cleanColumns) ? cleanColumns : '2';
  const validAlignment =
    cleanAlignment && ['left', 'center', 'right'].includes(cleanAlignment)
      ? cleanAlignment
      : 'left';

  const getAlignmentClass = () => {
    switch (validAlignment) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  const getColumnsClass = () => {
    // Using flexbox with responsive behavior
    // Each item gets a flex basis that creates the desired columns
    switch (validColumns) {
      case '3':
        return 'basis-full sm:basis-1/2 lg:basis-1/3';
      case '4':
        return 'basis-full sm:basis-1/2 lg:basis-1/4';
      default: // '2'
        return 'basis-full sm:basis-1/2';
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`py-8 ${className}`.trim()}>
      <div
        className={`flex flex-wrap gap-6 ${getAlignmentClass()}`}
        data-columns={validColumns}
        data-alignment={validAlignment}>
        {items.map((item) => {
          const renderItem = () => {
            switch (item._type) {
              case 'itemList':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return <ItemList {...(item as any)} />;
              case 'divider':
                return <Divider />;
              default:
                // This should never happen with proper typing
                return (
                  <div className='text-gray-500 text-center p-4'>
                    Unknown block type
                  </div>
                );
            }
          };

          return (
            <div key={item._key} className={`${getColumnsClass()}`}>
              {renderItem()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
