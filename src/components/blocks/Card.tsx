import React from 'react';
import type { CardBlock } from '@/types/blocks';
import ItemList from './ItemList';
import RichText from './RichText';
import Divider from '../UI/Divider';

interface CardProps extends Omit<CardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
}

const Card = ({ content, className = '', isGridChild = false }: CardProps) => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  // Render content items
  const renderContentItem = (item: (typeof content)[0], index: number) => {
    switch (item._type) {
      case 'itemList':
        return <ItemList key={item._key || index} {...item} />;
      case 'divider':
        return <Divider key={item._key || index} />;
      case 'richText':
        return <RichText key={item._key || index} {...item} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        bg-card-gradient 
        border border-gray-200 
        rounded-lg 
        p-6 md:p-10 
        flex 
        flex-col 
        items-center 
        text-center 
        ${!isGridChild ? 'max-w-[800px] mx-auto' : ''}
        ${className}
      `.trim()}>
      <div className='w-full space-y-4'>
        {content.map((item, index) => renderContentItem(item, index))}
      </div>
    </div>
  );
};

export default Card;
