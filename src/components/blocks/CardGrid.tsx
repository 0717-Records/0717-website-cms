import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CardGridBlock } from '@/types/blocks';
import Card from './Card';

const CardGrid = ({ columns = '2', cards }: CardGridBlock) => {
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  // Clean the columns value to remove Sanity's stega encoding
  const cleanColumns = stegaClean(columns) || '2';

  // Ensure we have a valid value
  const validColumns = ['2', '3', '4'].includes(cleanColumns) ? cleanColumns : '2';

  // Get the effective number of columns for the current breakpoint
  const getEffectiveColumns = (selectedCols: string) => {
    // For implementation, we'll use the desktop column count to calculate rows
    // CSS will handle the responsive behavior
    return parseInt(selectedCols);
  };

  // Get CSS classes for responsive card widths
  const getCardClasses = (cols: string) => {
    switch (cols) {
      case '2':
        return 'w-full md:w-[calc(50%-12px)]';
      case '3':
        return 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]';
      case '4':
        return 'w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]';
      default:
        return 'w-full md:w-[calc(50%-12px)]';
    }
  };

  // Calculate rows for equal height cards based on desktop column count
  const getCardsInRows = (cols: string) => {
    const colsNum = getEffectiveColumns(cols);
    const rows = [];

    for (let i = 0; i < cards.length; i += colsNum) {
      rows.push(cards.slice(i, i + colsNum));
    }

    return rows;
  };

  const rows = getCardsInRows(validColumns);
  const cardClasses = getCardClasses(validColumns);

  return (
    <div className='w-full space-y-6'>
      {rows.map((row, rowIndex) => {
        const isIncompleteRow = row.length < getEffectiveColumns(validColumns);

        return (
          <div
            key={rowIndex}
            className={`
              flex flex-wrap gap-6 w-full
              ${isIncompleteRow ? 'justify-center' : 'justify-start'}
            `.trim()}>
            {row.map((card, cardIndex) => (
              <Card
                key={card._key || cardIndex}
                content={card.content}
                className={`h-full ${cardClasses}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CardGrid;
