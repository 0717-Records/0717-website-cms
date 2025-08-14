import React from 'react';
import type { CardBlock } from '@/types/blocks';
import ItemList from './ItemList';
import RichText from './RichText';
import Divider from '../UI/Divider';

const Card = ({
  content,
  className = '',
}: Omit<CardBlock, '_type' | '_key'> & { className?: string }) => {
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
        bg-yellow-50 
        border border-gray-300 
        rounded-lg 
        p-6 md:p-10 
        w-full 
        flex 
        flex-col 
        items-center 
        text-center 
        ${className}
      `.trim()}>
      <div className='w-full space-y-4'>
        {content.map((item, index) => renderContentItem(item, index))}
      </div>
    </div>
  );
};

export default Card;
