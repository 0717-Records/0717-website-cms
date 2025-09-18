import React from 'react';
import { stegaClean } from 'next-sanity';
import type { CardBlock } from '@/types/blocks';
import Icon from './Icon';
import CTAList from '../UI/CTAList';
import CardContainer from '../UI/CardContainer';
import Heading from '../Typography/Heading/Heading';
import { createSanityDataAttribute } from '@/utils/sectionHelpers';

interface CardProps extends Omit<CardBlock, '_type' | '_key'> {
  className?: string;
  isGridChild?: boolean;
  documentId?: string;
  documentType?: string;
  fieldPathPrefix?: string;
}

const Card = (props: CardProps) => {
  const {
    cardStyle = 'feature',
    icon,
    title,
    bodyText,
    ctaList,
    className = '',
    isGridChild = false,
    documentId,
    documentType,
    fieldPathPrefix,
  } = props;
  const cleanTitle = stegaClean(title);
  const cleanBodyText = stegaClean(bodyText);
  const cleanCardStyle = stegaClean(cardStyle) || 'feature';

  // Don't render empty cards (but allow cards with just text content and no button)
  if (!icon?.showIcon && !cleanTitle && !cleanBodyText) {
    return null;
  }

  // Get field path prefix for live editing
  const getFieldPath = (field: string) => (fieldPathPrefix ? `${fieldPathPrefix}.${field}` : field);

  // Feature Card (Style 1) - Current layout
  if (cleanCardStyle === 'feature') {
    return (
      <CardContainer
        className={`${className} flex flex-col gap-6 text-center items-center`}
        isGridChild={isGridChild}>
        {/* Icon */}
        {icon && icon.showIcon && (
          <div className='flex justify-center'>
            <Icon
              image={icon.image}
              showIcon={icon.showIcon}
              {...createSanityDataAttribute(documentId, documentType, fieldPathPrefix || '')}
            />
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

        {/* CTA Buttons */}
        {ctaList && ctaList.length > 0 && (
          <div
            className='pt-6'
            {...createSanityDataAttribute(documentId, documentType, getFieldPath('ctaList'))}>
            <CTAList ctaList={ctaList} alignment='flex-col' />
          </div>
        )}
      </CardContainer>
    );
  }

  // Info Card (Style 2) - Horizontal layout with icon on left, content on right
  if (cleanCardStyle === 'info') {
    return (
      <CardContainer
        className={`${className} flex flex-row items-start gap-6`}
        isGridChild={isGridChild}>
        {/* Icon - 1/3 width when present */}
        {icon && icon.showIcon && (
          <div className='flex-shrink-0 flex justify-center'>
            <Icon
              image={icon.image}
              showIcon={icon.showIcon}
              {...createSanityDataAttribute(documentId, documentType, fieldPathPrefix || '')}
            />
          </div>
        )}

        {/* Content - 2/3 width when icon present, full width otherwise */}
        <div className={`flex flex-col gap-4 text-left`}>
          {/* Title */}
          {cleanTitle && (
            <div
              className='text-h6 font-bold'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('title'))}>
              {cleanTitle}
            </div>
          )}

          {/* Body Text */}
          {cleanBodyText && (
            <p
              className='text-gray-600 leading-relaxed whitespace-pre-line'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('bodyText'))}>
              {cleanBodyText}
            </p>
          )}

          {/* CTA Buttons */}
          {ctaList && ctaList.length > 0 && (
            <div
              className='mt-2'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('ctaList'))}>
              <CTAList ctaList={ctaList} alignment='flex-col' />
            </div>
          )}
        </div>
      </CardContainer>
    );
  }

  // Statement Card (Style 3) - Decorative layout for core values
  return (
    <CardContainer
      className={`${className} relative overflow-hidden bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100`}
      isGridChild={isGridChild}>
      <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8 p-3 lg:p-4'>
        {/* Left side - Icon */}
        {icon && icon.showIcon && (
          <div className='flex-shrink-0 relative'>
            {/* Icon background circle */}
            <div className='relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center rounded-full bg-brand-secondary/15'>
              <Icon
                image={icon.image}
                showIcon={icon.showIcon}
                className='w-16 h-16 lg:w-20 lg:h-20'
                {...createSanityDataAttribute(documentId, documentType, fieldPathPrefix || '')}
              />
            </div>
          </div>
        )}

        {/* Right side - Content */}
        <div className='flex-1 flex flex-col gap-4 md:gap-8 text-center lg:text-left'>
          {/* Title */}
          {cleanTitle && (
            <div {...createSanityDataAttribute(documentId, documentType, getFieldPath('title'))}>
              <Heading level='h2' showFullWidthUnderline asDiv>
                {cleanTitle}
              </Heading>
            </div>
          )}

          {/* Body Text */}
          {cleanBodyText && (
            <p
              className='text-body-xl text-gray-600 leading-relaxed whitespace-pre-line font-medium italic'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('bodyText'))}>
              {cleanBodyText}
            </p>
          )}

          {/* CTA Buttons */}
          {ctaList && ctaList.length > 0 && (
            <div
              className='mt-6'
              {...createSanityDataAttribute(documentId, documentType, getFieldPath('ctaList'))}>
              <CTAList ctaList={ctaList} alignment='flex-row' />
            </div>
          )}
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
