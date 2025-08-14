import React from 'react';
import type { CardGridBlock } from '@/types/blocks';
import Card from './Card';

const CardGrid = ({ columns = '2', cards }: CardGridBlock) => {
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  // Grid column classes for different breakpoints
  const getGridClasses = (cols: string) => {
    const baseClasses = 'grid gap-6 w-full';

    switch (cols) {
      case '2':
        return `${baseClasses} grid-cols-1 md:grid-cols-2`;
      case '3':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
      case '4':
        return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-1 md:grid-cols-2`;
    }
  };

  // Calculate rows for equal height cards in each row
  const getCardsInRows = (cols: string) => {
    const colsNum = parseInt(cols);
    const rows = [];

    for (let i = 0; i < cards.length; i += colsNum) {
      rows.push(cards.slice(i, i + colsNum));
    }

    return rows;
  };

  const rows = getCardsInRows(columns);

  return (
    <div className='w-full space-y-6'>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`
            ${getGridClasses(columns)}
            ${row.length < parseInt(columns) ? 'justify-center' : ''}
          `}>
          {row.map((card, cardIndex) => (
            <Card
              key={card._key || cardIndex}
              content={card.content}
              className='h-full' // Equal height within each row
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
