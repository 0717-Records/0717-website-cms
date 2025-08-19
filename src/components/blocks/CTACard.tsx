import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CTACardBlock } from '@/types/blocks';
import Icon from './Icon';
import EmbeddedCTAButton from './EmbeddedCTAButton';
import CTAEmailButtonComponent from './CTAEmailButton';
import CardContainer from '../UI/CardContainer';

interface CTACardProps extends Omit<CTACardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
  email?: string; // For passing company email from siteSettings
}

const CTACard = ({
  icon,
  title,
  bodyText,
  buttonType,
  text,
  variant,
  linkType,
  internalLink,
  openInNewTab,
  externalUrl,
  className = '',
  isGridChild = false,
  email,
}: CTACardProps) => {
  const cleanTitle = stegaClean(title);
  const cleanBodyText = stegaClean(bodyText);
  const cleanButtonText = stegaClean(text);

  // Don't render empty cards (but allow cards with just text content and no button)
  if (!icon?.image && !cleanTitle && !cleanBodyText) {
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
      {buttonType && buttonType !== 'none' && (
        <div className='pt-2'>
          {buttonType === 'link' && cleanButtonText && (
            <EmbeddedCTAButton
              text={text}
              variant={variant}
              linkType={linkType}
              internalLink={internalLink}
              openInNewTab={openInNewTab}
              externalUrl={externalUrl}
            />
          )}
          {buttonType === 'email' && (
            <CTAEmailButtonComponent email={email} />
          )}
        </div>
      )}
    </CardContainer>
  );
};

export default CTACard;
