import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CardBlock } from '@/types/blocks';
import Icon from './Icon';
import CTA from '../UI/CTA';

interface CardProps extends Omit<CardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
}

const Card = ({
  icon,
  title,
  bodyText,
  button,
  className = '',
  isGridChild = false,
}: CardProps) => {
  const cleanTitle = stegaClean(title);
  const cleanBodyText = stegaClean(bodyText);
  const cleanButtonText = stegaClean(button?.text);
  const cleanButtonLink = stegaClean(button?.link);

  // Don't render empty cards
  if (!icon?.image && !cleanTitle && !cleanBodyText && !cleanButtonText) {
    return null;
  }

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
        {/* Icon */}
        {icon && icon.image && (
          <div className='flex justify-center'>
            <Icon {...icon} />
          </div>
        )}

        {/* Title */}
        {cleanTitle && (
          <div className='text-h3 heading-underline-h3 font-semibold text-gray-900'>
            {cleanTitle}
          </div>
        )}

        {/* Body Text */}
        {cleanBodyText && (
          <p className='text-body-xl text-gray-600 leading-relaxed whitespace-pre-line'>{cleanBodyText}</p>
        )}

        {/* Button */}
        {cleanButtonText && cleanButtonLink && (
          <div className='pt-2'>
            <CTA href={cleanButtonLink} variant='filled'>
              {cleanButtonText}
            </CTA>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
