import React from 'react';
import type { CTAEmailButtonBlock } from '@/types/blocks';
import type { CTABlockProps } from '@/types/shared';
import CTAEmailButton from '../UI/CTAEmailButton';
import { getAlignmentClasses } from './shared/alignmentUtils';

type CTAEmailButtonProps = CTABlockProps<CTAEmailButtonBlock>;

const CTAEmailButtonComponent = (props: CTAEmailButtonProps) => {
  const {
    alignment = 'inherit',
    inheritAlignment,
    className = '',
  } = props;

  const alignmentClasses = getAlignmentClasses(alignment, inheritAlignment);

  return (
    <div className={`flex ${alignmentClasses} ${className}`.trim()}>
      <CTAEmailButton />
    </div>
  );
};

export default CTAEmailButtonComponent;