import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CardGridBlock } from '@/types/blocks';
import Card from './Card';

interface CardGridProps extends CardGridBlock {
  email?: string; // For passing company email from siteSettings
  documentId?: string;
  documentType?: string;
}

const CardGrid = ({ columns = '2', cards, email, documentId, documentType }: CardGridProps) => {
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null;
  }

  const cleanColumns = stegaClean(columns) || '2';
  const validColumns = ['2', '3', '4'].includes(cleanColumns) ? cleanColumns : '2';

  const getCardClasses = (cols: string) => {
    switch (cols) {
      case '2':
        return 'w-full md:w-[calc(50%-16px)]';
      case '3':
        return 'w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]';
      case '4':
        return 'w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]';
      default:
        return 'w-full md:w-[calc(50%-16px)]';
    }
  };

  const cardClasses = getCardClasses(validColumns);

  return (
    <div className='w-full flex justify-center flex-wrap gap-8'>
      {cards.map((card, idx) => (
        <Card
          key={card._key || idx}
          cardStyle={card.cardStyle}
          icon={card.icon}
          title={card.title}
          bodyText={card.bodyText}
          buttonType={card.buttonType}
          text={card.text}
          variant={card.variant}
          linkType={card.linkType}
          internalLink={card.internalLink}
          openInNewTab={card.openInNewTab}
          externalUrl={card.externalUrl}
          email={email}
          className={`${cardClasses}`}
          isGridChild
          documentId={documentId}
          documentType={documentType}
        />
      ))}
    </div>
  );
};

export default CardGrid;
