import React from 'react';
import type { HOME_PAGE_QUERYResult } from '@/sanity/types';
import EmbeddedCTAButton from '../blocks/EmbeddedCTAButton';
import { createSanityDataAttribute } from '../../utils/sectionHelpers';

interface HeroCTAProps {
  enableHeroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['enableHeroCallToAction'];
  heroCallToAction: NonNullable<HOME_PAGE_QUERYResult>['heroCallToAction'];
  documentId: string;
  documentType: string;
}

const HeroCTA = ({ enableHeroCallToAction, heroCallToAction, documentId, documentType }: HeroCTAProps) => {
  if (!enableHeroCallToAction || !heroCallToAction) return null;

  return (
    <div {...createSanityDataAttribute(documentId, documentType, 'heroCallToAction')}>
      <EmbeddedCTAButton {...heroCallToAction} />
    </div>
  );
};

export default HeroCTA;