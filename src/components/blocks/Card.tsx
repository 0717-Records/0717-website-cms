import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CardBlock } from '@/types/blocks';
import Icon from './Icon';
import EmbeddedCTAButton from './EmbeddedCTAButton';
import CTAEmailButtonComponent from './CTAEmailButton';
import CardContainer from '../UI/CardContainer';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CardProps extends Omit<CardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
  email?: string; // For passing company email from siteSettings
  documentId?: string;
  documentType?: string;
}

const Card = ({
  cardStyle = 'feature',
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
  documentId,
  documentType,
}: CardProps) => {
  const cleanTitle = stegaClean(title);
  const cleanBodyText = stegaClean(bodyText);
  const cleanButtonText = stegaClean(text);
  const cleanCardStyle = stegaClean(cardStyle) || 'feature';

  // Don't render empty cards (but allow cards with just text content and no button)
  if (!icon?.image && !cleanTitle && !cleanBodyText) {
    return null;
  }

  // Get field path prefix for live editing
  const getFieldPath = (field: string) => `${field}`;

  // Feature Card (Style 1) - Current layout
  if (cleanCardStyle === 'feature') {
    return (
      <CardContainer
        className={`${className} flex flex-col gap-6 text-center items-center`}
        isGridChild={isGridChild}>
        {/* Icon */}
        {icon && icon.image && (
          <div className='flex justify-center'>
            <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('icon'))}>
              <Icon {...icon} />
            </div>
          </div>
        )}

        {/* Title */}
        {cleanTitle && (
          <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('title'))}>
            <Heading level='h3' showUnderline asDiv>
              {cleanTitle}
            </Heading>
          </div>
        )}

        {/* Body Text */}
        {cleanBodyText && (
          <p
            className='text-body-xl text-gray-600 leading-relaxed whitespace-pre-line'
            {...createSanityDataAttribute(documentId, documentType, getFieldPath('bodyText'))}>
            {cleanBodyText}
          </p>
        )}

        {/* Button */}
        {buttonType && buttonType !== 'none' && (
          <div className='pt-2'>
            {buttonType === 'link' && cleanButtonText && (
              <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('text'))}>
                <EmbeddedCTAButton
                  text={text}
                  variant={variant}
                  linkType={linkType}
                  internalLink={internalLink}
                  openInNewTab={openInNewTab}
                  externalUrl={externalUrl}
                />
              </div>
            )}
            {buttonType === 'email' && <CTAEmailButtonComponent email={email} />}
          </div>
        )}
      </CardContainer>
    );
  }

  // Statement Card (Style 2) - Decorative layout for core values
  return (
    <CardContainer
      className={`${className} relative overflow-hidden bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100`}
      isGridChild={isGridChild}>
      <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8 p-3 lg:p-8'>
        {/* Left side - Icon */}
        {icon && icon.image && (
          <div className='flex-shrink-0 relative'>
            <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('icon'))}>
              {/* Icon background circle */}
              <div className='absolute inset-0 w-24 h-24 lg:w-32 lg:h-32 bg-brand-secondary/25 rounded-full blur-sm'></div>
              <div className='relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center rounded-full'>
                <Icon {...icon} className='w-16 h-16 lg:w-20 lg:h-20' />
              </div>
            </div>
          </div>
        )}

        {/* Right side - Content */}
        <div className='flex-1 text-center lg:text-left'>
          {/* Title */}
          {cleanTitle && (
            <div
              className='text-h2 lg:text-h1 font-bold text-gray-900 mb-4 leading-tight relative'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('title'))}>
              {cleanTitle}
              {/* Subtle underline accent */}
              <div className='absolute -bottom-1 left-0 lg:left-0 w-16 h-1 bg-brand-secondary opacity-30 rounded'></div>
            </div>
          )}

          {/* Body Text */}
          {cleanBodyText && (
            <p
              className='text-body-lg lg:text-body-2xl text-gray-600 leading-relaxed whitespace-pre-line font-medium italic'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('bodyText'))}>
              {cleanBodyText}
            </p>
          )}

          {/* Button */}
          {buttonType && buttonType !== 'none' && (
            <div className='mt-6'>
              {buttonType === 'link' && cleanButtonText && (
                <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('text'))}>
                  <EmbeddedCTAButton
                    text={text}
                    variant={variant}
                    linkType={linkType}
                    internalLink={internalLink}
                    openInNewTab={openInNewTab}
                    externalUrl={externalUrl}
                  />
                </div>
              )}
              {buttonType === 'email' && <CTAEmailButtonComponent email={email} />}
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
