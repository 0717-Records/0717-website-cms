import React from 'react';
import type { CTAEmailButtonBlock } from '@/types/blocks';
import type { CTABlockProps } from '@/types/shared';
import CTAEmailButton from '../UI/CTAEmailButton';
import { getAlignmentClasses } from './shared/alignmentUtils';

type CTAEmailButtonProps = CTABlockProps<CTAEmailButtonBlock>;

const CTAEmailButtonComponent = (props: CTAEmailButtonProps) => {
  const { alignment, inheritAlignment, className = '' } = props;

  // Only apply alignment if alignment field exists (for non-embedded versions)
  const alignmentClasses =
    alignment !== undefined ? getAlignmentClasses(alignment, inheritAlignment) : '';

  // For embedded versions (no alignment field), render without wrapper
  if (alignment === undefined) {
    return <CTAEmailButton className={className} />;
  }

  // Determine width class - if className contains 'w-full', use that, otherwise use responsive default
  const widthClass = className.includes('w-full') ? 'w-full' : 'w-full sm:w-auto';

  // For non-embedded versions (with alignment field), render with alignment wrapper
  return (
    <div className={`flex ${alignmentClasses} ${className}`.trim()}>
      <CTAEmailButton className={widthClass} />
    </div>
  );
};

export default CTAEmailButtonComponent;
