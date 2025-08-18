import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTACardBlock } from '@/types/blocks';
import Icon from './Icon';
import EmbeddedCTAButton from './EmbeddedCTAButton';
import CardContainer from '../UI/CardContainer';

interface CTACardProps extends Omit<CTACardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
}

const CTACard = ({
  icon,
  title,
  bodyText,
  button,
  className = '',
  isGridChild = false,
}: CTACardProps) => {
  const cleanTitle = stegaClean(title);
  const cleanBodyText = stegaClean(bodyText);
  const cleanButtonText = stegaClean(button?.text);

  // Don't render empty cards
  if (!icon?.image && !cleanTitle && !cleanBodyText && !cleanButtonText) {
    return null;
  }

  return (
    <CardContainer className={className} isGridChild={isGridChild}>
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
      {button && cleanButtonText && (
        <div className='pt-2'>
          <EmbeddedCTAButton {...button} />
        </div>
      )}
    </CardContainer>
  );
};

export default CTACard;
